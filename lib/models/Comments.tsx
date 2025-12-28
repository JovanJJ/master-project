import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "Worker",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
},
    { timestamps: true },
)

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);