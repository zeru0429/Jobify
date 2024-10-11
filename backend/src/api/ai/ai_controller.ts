import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../config/secrete.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

const aiController = {
  generateJobDescription: async (req: Request, res: Response) => {
    try {
      // Check if at least one field is provided
      const {
        title,
        type,
        description,
        location,
        salary,
        contactEmail,
        company,
        contactName,
        contactNumber,
      } = req.body;

      if (
        !title &&
        !type &&
        !description &&
        !location &&
        !salary &&
        !contactEmail &&
        !company &&
        !contactName &&
        !contactNumber
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one of the fields (title, type, description, location, salary, contactEmail, company, contactName, contactNumber) is required.",
        });
      }

      const content = `Generate a job description for a title of ${
        title || "N/A"
      }.
      Job Type: ${type || "N/A"}.
      Description: ${description || "N/A"}.
      Location: ${location || "N/A"}.
      Salary: ${salary || "N/A"}.
      Contact Email: ${contactEmail || "N/A"}.
      Company: ${company || "N/A"}.
      Contact Name: ${contactName || "N/A"}.
      Contact Number: ${contactNumber || "N/A"}.
      Please include key responsibilities, qualifications, and any additional requirements.`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([content]);

      if (
        result &&
        result.response &&
        result.response.candidates &&
        result.response.candidates.length > 0
      ) {
        const data = result.response.candidates[0].content.parts[0].text;

        return res.status(200).json({
          success: true,
          data: data,
        });
      }

      return res.status(200).json({
        success: true,
        message: "No candidates returned.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    }
  },

  generateSearchSuggestions: async (req: Request, res: Response) => {
    try {
      // Check if query is provided
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({
          success: false,
          message: "query is required.",
        });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        `Provide short autocomplete suggestions for the search term: "${query}".`,
      ]);

      if (
        result &&
        result.response &&
        result?.response?.candidates &&
        result?.response?.candidates?.length > 0
      ) {
        const data = result.response.candidates[0].content.parts[0].text;
        const query = req.body.query;
        const regex = new RegExp(`${query}([^*]*)\\*\\s*(.*?)\\n`, "g");
        const suggestions = [];
        let match;
        while ((match = regex.exec(data!)) !== null) {
          suggestions.push(match[2].trim());
        }
        return res.status(200).json({
          success: true,
          data: suggestions,
          full: data,
        });
      }

      return res.status(200).json({
        success: true,
        message: "No suggestions returned.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
};

export default aiController;
