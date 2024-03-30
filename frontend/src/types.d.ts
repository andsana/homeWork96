export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: File | string | null;
}
export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  image: string;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Cocktail {
  _id: string;
  user: string;
  title: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}

export interface Ingredient {
  title: string;
  quantity: number;
}

export interface CocktailMutation {
  title: string;
  image: File | string | null;
  recipe: string;
  ingredients: IngredientMutation[];
}

export interface IngredientMutation {
  title: string;
  quantity: number;
}
