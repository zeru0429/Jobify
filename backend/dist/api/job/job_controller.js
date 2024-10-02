var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Job from "./job_module.js";
const jobController = {
    createJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            req.body.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!req.body.title ||
                !req.body.type ||
                !req.body.description ||
                !req.body.location ||
                !req.body.salary ||
                !req.body.company ||
                !req.body.contactEmail ||
                !req.body.contactName ||
                !req.body.contactNumber ||
                !req.body.createdBy) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }
            const job = new Job(req.body);
            yield job.save();
            res.status(201).json({
                success: true,
                message: "Job created successfully",
                data: job,
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }),
    getAllJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jobs = yield Job.find();
            res.status(200).json({
                success: true,
                data: jobs,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }),
    getSingleJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const job = yield Job.findById(req.params.id);
            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found",
                });
            }
            res.status(200).json({
                success: true,
                data: job,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }),
    updateJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const job = yield Job.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Job updated successfully",
                data: job,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }),
    deleteJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const job = yield Job.findByIdAndDelete(req.params.id);
            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Job deleted successfully",
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }),
};
export default jobController;
