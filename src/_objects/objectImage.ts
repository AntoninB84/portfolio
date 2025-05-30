export type ObjectImage = {
  id: string;
  objectId: string;
  objectType: ImageObjectType;
  imageUrl: string;
};

enum ImageObjectType {
  Techno,
  Project
}