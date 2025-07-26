import mongoose from "mongoose";


export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, // for auth
    role: { type: String, enum: ["engineer", "manager"], required: true },

    // Only for engineers
    skills: [{ type: String }],
    seniority: { type: String },
    maxCapacity: { type: Number, default: 100 }, // 100 for full-time, 50 for part-time
    department: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;