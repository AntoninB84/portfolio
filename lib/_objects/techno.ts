import z from "zod";

export type Techno = {
  id: string;
  name: string;
};

export const TechnoFormSchema = z.object({
    id: z.string(),
    name: z.string(),
});