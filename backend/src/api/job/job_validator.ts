import z from "zod";

const jobValidator = {
  create: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    location: z.string(),
    salary: z.string(),
    company: z.string(),
    contactEmail: z.string(),
  }),
  update: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    salary: z.string().optional(),
    company: z.string().optional(),
    contactEmail: z.string().optional(),
  }),
};

export default jobValidator;
