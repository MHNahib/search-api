import { Schema, model, Document, Types } from "mongoose";

interface PostDocument extends Document {
  keyword: string;
  posts: Types.ObjectId[];
  track: Types.ObjectId;
}

interface searchTrackDocument extends Document {
  users: Types.ObjectId[];
  keyword: Types.ObjectId;
}

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
