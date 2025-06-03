import z from "zod";
import { ObjectImage } from "./objectImage";
import { Techno } from "./techno";

export type Project = {
  id: string;
  name: string;
  description: string;
  year: number;
  isMobile: boolean;
  isWeb: boolean;
  technos: [Techno];
  images: [ObjectImage];
};

export type ProjectForm = {
  id: string;
  name: string;
  description: string;
  year: number;
  isMobile: boolean;
  isWeb: boolean;
};

export const ProjectFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    year: z.number().min(2000),
    isMobile: z.boolean(),
    isWeb: z.boolean(),
});