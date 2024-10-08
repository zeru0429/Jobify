import { NextFunction, Request, Response } from "express";

export const errorHandlerMethod: any = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `${"server error"}`,
        error: `${error.message}`,
      });
    }
  };
};
