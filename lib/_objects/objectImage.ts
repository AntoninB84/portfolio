export type ObjectImage = {
  id: string;
  objectId: string;
  objectType: ImageObjectType;
  filename: string;
  imagetype: string;
  position: number;
};

export enum ImageObjectType {
  Techno = 'Techno',
  Project = "Project"
}

export enum ImageType {
  Logo = 'Logo',
  Image = 'Image'
}