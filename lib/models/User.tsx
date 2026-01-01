import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    image: String,
    role: {
        type: String,
        default: "user",
    },
     googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    },
    {timestamps: true}
);
export default mongoose.models.User ||
mongoose.model("User", userSchema);