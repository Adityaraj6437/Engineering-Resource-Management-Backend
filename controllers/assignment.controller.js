import Assignment from "../models/Assignment.js";

export const getAllAssignments = async(req,res)=>{
    try {
    const assignments = await Assignment.find()
      .populate("engineerId", "name skills")
      .populate("projectId", "name");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching assignments" });
  }
}


export const createAssignment= async(req,res)=>{
    try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: "Error creating assignment" });
  }
}

export const updateAssignment= async(req,res)=>{
   try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Assignment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating assignment" });
  }
}


export const deleteAssignment= async(req,res)=>{
    try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting assignment" });
  }
}