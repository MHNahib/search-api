import { Request } from "express";
export const getClientIP = (req: Request) => {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    ""
  );
};
