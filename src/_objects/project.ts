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