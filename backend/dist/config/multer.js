import multer from "multer";
import { ensureDirectoryExists } from "../util/ensure.js";
import { BASE_URL } from "./secrete.js";
// Store the original image
const storageOriginal = (dest) => {
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
const uploadOriginal = (dest) => {
    return (req, res, next) => {
        multer({
            storage: storageOriginal(dest),
            fileFilter: function (req, file, cb) {
                cb(null, true); // Allow all file types for now
            },
        }).single("file")(req, res, (err) => {
            var _a;
            if (err) {
                return next(err); // Handle error
            }
            // Logic to handle file path
            let filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replace("dist", ""); // Get the path of the uploaded file
            filePath = `${BASE_URL}${filePath}`;
            // Attach the modified filePath to the request object
            req.filePath = filePath; // This should now work without errors
            next(); // Call the next middleware
        });
    };
};
export default uploadOriginal;
