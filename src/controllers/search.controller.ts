import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { extractString, response, searchPosts } from "../utils";
import { getApi } from "../services";
import { EXTERNAL_API } from "../configs";

const searchController: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { keyword } = req.query;

    const processedKeyword = extractString(keyword as string | undefined);

    let posts = [];

    if (EXTERNAL_API) {
      const allPosts = await getApi(EXTERNAL_API);
      posts = searchPosts(allPosts, processedKeyword);
    } else {
      return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        "Internal Server Error"
      );
    }

    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      {
        count: posts?.length,
        posts: posts,
      },
      "Accepted"
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
