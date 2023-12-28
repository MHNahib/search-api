import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils";

const homecontroller: RequestHandler = (req: Request, res: Response): void => {
  response(res, StatusCodes.ACCEPTED, true, { info: "Simple api" }, "OK");
};

export default homecontroller;
