import z from "zod";
//!job || !applicantName || !applicantEmail

const applicantValidator = {
  create: z.object({
    job: z.string(),
    applicantName: z.string(),
    applicantEmail: z.string(),
  }),
  update: z.object({
    job: z.string().optional(),
    applicantName: z.string().optional(),
    applicantEmail: z.string().optional(),
  }),
};
export default applicantValidator;
