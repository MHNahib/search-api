import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("error: ", (err as Error).stack);

  if (err instanceof CustomError) {
    return res.status(err.status || 500).json({
      status: false,
      data: null,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: false,
    data: null,
    message: "Internal Server Error",
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  return res.status(404).json({
    status: false,
    data: null,
    message: "Not Found",
  });
};
