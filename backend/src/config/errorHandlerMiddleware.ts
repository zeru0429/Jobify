import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

// Define an interface for the error object to include statusCode and message
interface CustomError extends Error {
  statusCode?: number;
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later";

  res.status(statusCode).json({
    success: false,
    message: msg,
  });
};

export default errorHandlerMiddleware;
