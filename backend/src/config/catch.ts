import { NextFunction, Request, Response } from "express";
import NodeCache from "node-cache";

// Create a new instance of NodeCache
const myCache = new NodeCache();
const cacheDuration = 5;

const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const key = req.originalUrl;

  // Check if the request method is not GET
  if (req.method !== "GET") {
    // Invalidate the cache for the current route
    myCache.del(key);
    return next();
  }

  // Check cache for GET request
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
