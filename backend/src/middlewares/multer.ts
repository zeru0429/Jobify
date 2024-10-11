import multer, { StorageEngine, FileFilterCallback, Multer } from "multer";
import { ensureDirectoryExists } from "../util/ensure.js";
import { BASE_URL } from "../config/secrete.js";
import { NextFunction, Response, Request } from "express";
import DataParser from "datauri/parser.js";
import path from "path";
// Define the type for the destination folder
type Destination = string;
const parser = new DataParser();
// Store the original image
const storage = multer.memoryStorage(); // Store files in memory
export const upload = multer({ storage });
// Updated multer configuration for multiple files
export const uploadMulti = multer({ storage }).array("files", 2);
export const formatImage = (file: any) => {
  const fileExtension = path.extname(file.originalname).toString();
  console.log(fileExtension);

  return parser.format(fileExtension, file.buffer).content;
};
