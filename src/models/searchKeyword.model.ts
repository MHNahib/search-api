import { Schema, model, Document, Types } from "mongoose";
import { PostDocument, searchTrackDocument } from "../interfaces";

const searchKeywordSchema = new Schema<PostDocument>(
  {
    keyword: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "post", required: true }],

    track: { type: Schema.Types.ObjectId, ref: "search_track", required: true },
  },
  { timestamps: true }
);

const SearchKeywordModel = model<PostDocument>(
  "search_keyword",
  searchKeywordSchema
);

const searchTrackSchema = new Schema<searchTrackDocument>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],

    keyword: {
      type: Schema.Types.ObjectId,
      ref: "search_keyword",
      required: true,
    },
  },
  { timestamps: true }
);

const SearchTrackModel = model<searchTrackDocument>(
  "search_track",
  searchTrackSchema
);

export { SearchKeywordModel, SearchTrackModel };
