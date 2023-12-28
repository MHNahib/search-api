import mongoose from "mongoose";
import { SearchKeywordModel, SearchTrackModel } from "../models";

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
    console.error("Error getPostsBySearchKey:", error);
    throw error;
  }
};

const getSearchKeyData = async (keyword: string): Promise<any> => {
  const filter = { keyword };

  try {
    const result = await SearchKeywordModel.findOne(filter).populate({
      path: "posts",
    });

    return result;
  } catch (error) {
    console.error("Error getSearchKeyData:", error);
    throw error;
  }
};

const getSearchKeywodById = async (id: string): Promise<any> => {
  try {
    const result = await SearchKeywordModel.findById(id);
    return result;
  } catch (error) {
    console.error("Error getSearchKeywodById:", error);
    throw error;
  }
};

const upsertSearchTrack = async (
  userId: string,
  keywordId: string
): Promise<any> => {
  console.log("upsertSearchTrack: userId- ", userId, keywordId);
  try {
    const filter = { keyword: keywordId };

    const update = {
      keyword: keywordId,
      $addToSet: { users: userId },
    };

    const options = {
      upsert: true,
      new: true,
    };

    const searchTrack = await SearchTrackModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    console.log("-------> searchTrack: ", searchTrack);

    const findSearchTrackOnSearchKeyword = await getSearchKeywodById(keywordId);
    if (!findSearchTrackOnSearchKeyword) {
      await SearchTrackModel.findByIdAndUpdate(keywordId, {
        track: searchTrack?._id?.toString(),
      });
    }

    return searchTrack;
  } catch (error) {
    console.error("Error upsertSearchTrack:", error);
    throw error;
  }
};

export {
  upsertSearch,
  getPostsBySearchKey,
  getSearchKeyData,
  upsertSearchTrack,
};
