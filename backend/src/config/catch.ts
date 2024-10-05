import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

// Create a new instance of NodeCache
const myCache = new NodeCache();
const cacheDuration = 60;

const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check if the request method is GET
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = myCache.get(key);

  if (cachedResponse) {
    res.send(cachedResponse);
    return;
  }
  // If not cached, override the res.send method to cache the response
  const originalSend = res.send.bind(res);
  res.send = (body: any): Response => {
    if (res.statusCode === 200) {
      myCache.set(key, body, cacheDuration);
    }
    return originalSend(body);
  };

  next();
};

export default cacheMiddleware;
