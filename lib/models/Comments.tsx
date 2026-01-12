import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
       
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        refPath: "authorModel",
    },
     authorModel: {
      type: String,
      required: true,
      enum: ["User", "Worker"],
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