import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { extractString, response, searchPosts } from "../utils";
import {
  getApi,
  upsertPosts,
  upsertSearch,
  getPostsBySearchKey,
} from "../services";
import { EXTERNAL_API } from "../configs";

const searchController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { keyword } = req.query;

    if (!EXTERNAL_API) {
      return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        "Internal Server Error"
      );
    }

    const processedKeyword = extractString(keyword as string | undefined);

    let posts = [];

    posts = await getPostsBySearchKey(processedKeyword);

    if (posts?.length === 0) {
      const allPosts = await getApi(EXTERNAL_API);
      const filtaredPosts = searchPosts(allPosts, processedKeyword);

      posts = await upsertPosts(filtaredPosts);
      const postIds = posts?.filter((post: any) => post._id) || [];
      await upsertSearch(processedKeyword, postIds);
    }

    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      {
        count: posts?.length,
        posts: posts,
      },
      "OK"
    );
  } catch (error) {
    console.log("error: ", error);
    response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      "Internal Server Error"
    );
  }
};

export default searchController;
