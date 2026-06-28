import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  verifyToken: string;
  role: string;
  isActive: boolean;
  phone: string;
  gender: string;
  sessionIds: Array<string>;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
