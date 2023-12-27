import { Response } from "express";
import { getReasonPhrase } from "http-status-codes";

const response = (
  res: Response,
  code: number,
  status: boolean,
  data: object | null | any[],
  message?: string
) => {
  const defaultMessage = getReasonPhrase(code);
  const finalMessage = message || defaultMessage;

  return res.status(code).json({
    status,
    data,
    message: finalMessage,
  });
};

export default response;
