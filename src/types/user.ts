export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  role: string;
  active: boolean;
  favorites?: string[];
};

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLoggedIn: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
};
