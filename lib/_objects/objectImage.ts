export type ObjectImage = {
  id: string;
  objectId: string;
  objectType: ImageObjectType;
  fileName: string;
};

export enum ImageObjectType {
  Techno = 'Techno',
  Project = "Project"
}