import { Schema, model, Document, Types } from "mongoose";
import { UserDocument, UserHistoryDocument } from "../interfaces";

const userSchema = new Schema<UserDocument>(
  {
    ipAddress: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const userHistorySchema = new Schema<UserHistoryDocument>(
  {
    date: {
      type: Date,
      required: true,
    },

    user: { type: Schema.Types.ObjectId, ref: "user", required: true },

    keywords: [
      { type: Schema.Types.ObjectId, ref: "search_keyword", required: true },
    ],
  },
  { timestamps: true }
);

const UserModel = model<UserDocument>("user", userSchema);

const UserHistoryModel = model<UserHistoryDocument>(
  "user_history",
  userHistorySchema
);

export { UserModel, UserHistoryModel };
