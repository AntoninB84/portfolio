import z from "zod";
import { ObjectImage } from "./objectImage";
import { Techno } from "./techno";

export type Project = {
  id: string;
  name: string;
  description: string;
  year: number;
  ismobile: boolean;
  isweb: boolean;
  technos: Techno[];
  images: ObjectImage[];
};

export type ProjectForm = {
  id: string;
  name: string;
  description: string;
  year: number;
  ismobile: boolean;
  isweb: boolean;
  technos: string[];
  images: string[];
};

export const ProjectFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    year: z.string()
          .transform((value) => (value === "" ? "" : Number(value)))
          .refine((value) => !isNaN(Number(value)), {
            message: "Expected number, received string",
          }),
    ismobile: z.string().nullish(),
    isweb: z.string().nullish(),
    images: z.any(),
    technos: z.array(z.string()).nullish().or(z.string()),
});