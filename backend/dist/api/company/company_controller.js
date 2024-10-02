var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Company from "./company_module.js"; // Adjust the path as needed
const companyController = {
    // Create a new company
    createCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, logo, admin } = req.body;
            // Check if all required fields are provided
            if (!name || !admin) {
                return res.status(400).json({
                    success: false,
                    message: "Name and admin are required fields.",
                });
            }
            // Create and save the company
            const company = new Company({ name, logo, admin });
            yield company.save();
            res.status(201).json({
                success: true,
                message: "Company created successfully.",
                data: company,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while creating the company.",
            });
        }
    }),
    // Get all companies
    getAllCompanies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const companies = yield Company.find();
            res.status(200).json({
                success: true,
                data: companies,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching companies.",
            });
        }
    }),
    // Get a single company by ID
    getSingleCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const company = yield Company.findById(req.params.id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found.",
                });
            }
            res.status(200).json({
                success: true,
                data: company,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while fetching the company.",
            });
        }
    }),
    // Update a company by ID
    updateCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, logo } = req.body;
            // Check if company exists
            const company = yield Company.findById(req.params.id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found.",
                });
            }
            // Update company fields
            company.name = name !== undefined ? name : company.name;
            company.logo = logo !== undefined ? logo : company.logo;
            company.updatedAt = new Date(); // Create a new Date object
            yield company.save();
            res.status(200).json({
                success: true,
                message: "Company updated successfully.",
                data: company,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while updating the company.",
            });
        }
    }),
    // Delete a company by ID
    deleteCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const company = yield Company.findByIdAndDelete(req.params.id);
            if (!company) {
                return res.status(404).json({
                    success: false,
                    message: "Company not found.",
                });
            }
            res.status(200).json({
                success: true,
                message: "Company deleted successfully.",
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while deleting the company.",
            });
        }
    }),
};
export default companyController;
