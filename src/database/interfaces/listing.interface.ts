import { Document } from 'mongoose';

export interface IListing extends Document {
  name : string;
  description : string;
  address : string;
  regularPrice : number;
  discountPrice: number;
  bedrooms : number;
  bathrooms : number;
  furnished : boolean;
  parking : boolean;
  type : string;
  offer : boolean;
  imageUrls : Array<string>;
  userId : string;
  isDeleted : boolean;
  createdAt: string;
  updatedAt: string;
}
