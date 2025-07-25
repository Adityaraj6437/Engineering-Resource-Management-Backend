import User from "../models/User.js";
import Assignment from "../models/Assignment.js";

export const getEngineers = async (req, res) => {
    try {
        const engineers = await User.find({ role: "engineer" }).select("-password");
        res.json(engineers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const getEngineerCapacity = async (req, res) => {
  const { id } = req.params;

  try {
    const engineer = await User.findById(id);
    if (!engineer || engineer.role !== "engineer") {
      return res.status(404).json({ message: "Engineer not found" });
    }

    const today = new Date();

    const assignments = await Assignment.find({
      engineerId: id,
      startDate: { $lte: today },
      endDate: { $gte: today },
    });

    console.log("Assignments:", assignments);

    const totalAllocated = Array.isArray(assignments)
      ? assignments.reduce((sum, a) => sum + (a.allocationPercentage || 0), 0)
      : 0;

    const available = engineer.maxCapacity - totalAllocated;

    res.json({
      engineerId: id,
      maxCapacity: engineer.maxCapacity,
      allocated: totalAllocated,
      available,
    });
  } catch (err) {
    console.error("Error calculating engineer capacity:", err);
    res.status(500).json({ message: "Error calculating capacity", error: err.message });
  }
};