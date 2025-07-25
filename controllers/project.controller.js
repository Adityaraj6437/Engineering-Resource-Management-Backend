import Project from "../models/Project.js";

export const getAllProjects = async(req,res)=>{
    try{
        const projects = await Project.find();
        res.json(projects);
    }catch(err){
        res.status(500).json({ message: "Error fetching projects" });
    }
}

export const createProject = async(req,res)=>{
    try {
    const newProject = new Project({
      ...req.body,
      managerId: req.user.id,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
}


export const getProjectById = async(req,res)=>{
    try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project" });
  }
}