export type ObjectImage = {
  id: string;
  objectId: string;
  objectType: ImageObjectType;
  filename: string;
};

export enum ImageObjectType {
  Techno = 'Techno',
  Project = "Project"
}