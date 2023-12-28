import { Document, Types } from "mongoose";

export interface PostDocument extends Document {
  userId: number;
  postId: string;
  title: string;
  body: string;
}

export interface PostDocument extends Document {
  keyword: string;
  posts: Types.ObjectId[];
  track: Types.ObjectId;
}

export interface searchTrackDocument extends Document {
  users: Types.ObjectId[];
  keyword: Types.ObjectId;
}

export interface UserDocument extends Document {
  ipAddress: string;
  location: string;
}

export interface UserHistoryDocument extends Document {
  date: Date;
  user: Types.ObjectId | UserDocument;
  keywords: Types.ObjectId[];
}
