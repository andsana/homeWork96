import { Model } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  image: string;
  googleID?: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface UserMutation {
  email: string;
  password: string;
  displayName: string;
  image: string | null;
}
