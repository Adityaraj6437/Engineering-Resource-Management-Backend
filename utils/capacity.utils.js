import Assignment from "../models/assignment.model.js";
import User from "../models/user.model.js";

export const getAvailableCapacity = async (engineerId) => {
  const engineer = await User.findById(engineerId);
  if (!engineer || engineer.role !== "engineer") {
    throw new Error("Engineer not found or invalid");
  }

  const today = new Date();

  const activeAssignments = await Assignment.find({
    engineerId,
    startDate: { $lte: today },
    endDate: { $gte: today },
  });

  const totalAllocated = activeAssignments.reduce(
    (sum, assignment) => sum + assignment.allocationPercentage,
    0
  );

  return engineer.maxCapacity - totalAllocated;
};

