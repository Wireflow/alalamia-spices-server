import { Request, Response } from "express";

function errorHandlingMiddleware(err: Request, res: Response) {
  res.status(err.statusCode || 500).json({
    error: err.statusMessage || "Internal Server Error",
    message:
      "Oops something went wrong! Please check the endpoint url and try again.",
  });
}

export default errorHandlingMiddleware;
