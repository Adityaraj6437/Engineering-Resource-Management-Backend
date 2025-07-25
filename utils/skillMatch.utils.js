import User from "../models/user.model.js";
export const findSuitableEngineers = async (project) => {
  const engineers = await User.find({ role: "engineer" });

  const matched = engineers.filter((engineer) =>
    project.requiredSkills.some((skill) => engineer.skills.includes(skill))
  );

  return matched;
};