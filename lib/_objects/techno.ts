import {z} from "zod";

export type Techno = {
  id: string;
  name: string;
  logoId: string;
  logofilename: string;
};

export type TechnoForm = {
  id: string;
  name: string;
  logoid: string;
  logofilename: string;
};

export const TechnoFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    logo: z
      .any()
      .refine((file) => file instanceof File && file.size > 0, {
        message: "File is required",
      })
      //TODO extension check
});
