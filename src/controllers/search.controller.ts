import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { extractString, response, searchPosts } from "../utils";
import {
  getApi,
  upsertPosts,
  upsertSearch,
  getPostsBySearchKey,
  updateUserHistory,
  getAllPosts,
} from "../services";
import { EXTERNAL_API } from "../configs";

interface CustomRequest extends Request {
  clientIP?: string;
}

const searchController: RequestHandler = async (
  req: CustomRequest,
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

    let posts = [];

    if (!keyword) {
      posts = await getAllPosts();
    } else {
      const processedKeyword = extractString(keyword as string | undefined);

      posts = await getPostsBySearchKey(processedKeyword);

      if (posts?.length === 0) {
        const allPosts = await getApi(EXTERNAL_API);
        const filtaredPosts = searchPosts(allPosts, processedKeyword);

        posts = await upsertPosts(filtaredPosts);
        const postIds = posts?.filter((post: any) => post._id) || [];
        await upsertSearch(processedKeyword, postIds);
      }

      const ipAddress = req.clientIP;
      await updateUserHistory(ipAddress as string, processedKeyword);
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
    // console.log("error: ", error);
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
