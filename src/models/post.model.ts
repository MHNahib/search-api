import { Schema, model, Document } from "mongoose";

interface PostDocument extends Document {
  userId: number;
  postId: string;
  title: string;
  body: string;
}

const postSchema = new Schema<PostDocument>(
  {
    userId: {
      type: Number,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = model<PostDocument>("post", postSchema);

export { PostModel };
