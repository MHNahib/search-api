import { Schema, model, Document, Types } from "mongoose";

interface PostDocument extends Document {
  keyword: string;
  posts: Types.ObjectId[];
  hits: number;
}

const searchKeywordSchema = new Schema<PostDocument>(
  {
    keyword: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "post", required: true }],

    hits: { type: Number, required: true },
  },
  { timestamps: true }
);

const SearchKeywordModel = model<PostDocument>(
  "search_keyword",
  searchKeywordSchema
);

export { SearchKeywordModel };
