import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import response from "../utils";

const homecontroller: RequestHandler = (req: Request, res: Response): void => {
  response(res, StatusCodes.ACCEPTED, true, { say: "hello world" }, "Accepted");
};

export default homecontroller;
