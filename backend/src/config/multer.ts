import multer, { StorageEngine, FileFilterCallback } from "multer";
import { ensureDirectoryExists } from "../util/ensure.js";
import { BASE_URL } from "./secrete.js";
import { NextFunction, Response, Request } from "express";

// Define the type for the destination folder
type Destination = string;

// Store the original image
const storageOriginal = (dest: Destination): StorageEngine => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      ensureDirectoryExists(dest); // Ensure the directory exists
      cb(null, dest); // Destination folder for original uploads
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // File naming
    },
  });
};

const uploadOriginal = (dest: Destination) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multer({
      storage: storageOriginal(dest),
      fileFilter: function (req, file, cb: FileFilterCallback) {
        cb(null, true); // Allow all file types for now
      },
    }).single("file")(req, res, (err) => {
      if (err) {
        return next(err); // Handle error
      }

      // Logic to handle file path
      let filePath = req.file?.path.replace("dist", ""); // Get the path of the uploaded file
      filePath = `${BASE_URL}${filePath}`;

      // Attach the modified filePath to the request object
      req.filePath = filePath; // This should now work without errors

      next(); // Call the next middleware
    });
  };
};

export default uploadOriginal;
