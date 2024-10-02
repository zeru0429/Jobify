var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Application from "./applicant_module.js";
const applicationController = {
    createApplication: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { job, applicantName, applicantEmail, resume, coverLetter, status, } = req.body;
            // Validate required fields
            if (!job || !applicantName || !applicantEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Job, applicant name, and email are required",
                });
            }
            const application = new Application({
                job,
                applicantName,
                applicantEmail,
                resume,
                coverLetter,
                status,
            });
            yield application.save();
            res.status(201).json({
                success: true,
                message: "Application created successfully",
                data: application,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }),
    getAllApplications: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const applications = yield Application.find().populate("job");
            res.status(200).json({
                success: true,
                data: applications,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }),
    getSingleApplication: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const application = yield Application.findById(req.params.id).populate("job");
            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found",
                });
            }
            res.status(200).json({
                success: true,
                data: application,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }),
    updateApplication: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const application = yield Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Application updated successfully",
                data: application,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }),
    deleteApplication: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const application = yield Application.findByIdAndDelete(req.params.id);
            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "Application deleted successfully",
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    }),
};
export default applicationController;
