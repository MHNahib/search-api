import { Request, Response, NextFunction } from "express";
import { getClientIP } from "../utils";
interface CustomRequest extends Request {
  clientIP?: string;
}

const ipMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const clientIP = getClientIP(req);

  if (clientIP !== "") {
    req.clientIP = clientIP as string;
  }

  next();
};

export default ipMiddleware;
