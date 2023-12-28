import { SearchKeywordModel } from "../models";

const upsertSearch = async (keyword: string, postId: any[]): Promise<any> => {
  const filter = { keyword };

  const update = {
    keyword: keyword,
    posts: postId?.length > 0 ? postId : [],
    hits: 0,
  };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await SearchKeywordModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    console.log(`Upserted search ${result}`);
    return result;
  } catch (error) {
    console.error("Error upserting search:", error);
    throw error;
  }
};

const getPostsBySearchKey = async (keyword: string): Promise<any> => {
  const filter = { keyword };

  try {
    const result = await SearchKeywordModel.findOne(filter)
      .populate({
        path: "posts",
      })
      .select("posts");

    return result?.posts && result?.posts?.length > 0 ? result.posts : [];
  } catch (error) {
    console.error("Error upserting search:", error);
    throw error;
  }
};

export { upsertSearch, getPostsBySearchKey };
