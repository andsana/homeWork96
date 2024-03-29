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

export interface CocktailMutation {
  user: string;
  title: string;
  image: string | null;
  recipe: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  title: string;
  quantity: number;
}
