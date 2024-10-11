import { z } from "zod";
const companyValidator = {
  create: z.object({
    name: z.string(),
    type: z.string(),
    companyType: z.string(),
    address: z.string(),
  }),
  updateCompanyProfile: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    companyType: z.string().optional(),
    address: z.string().optional(),
  }),
};

export default companyValidator;
