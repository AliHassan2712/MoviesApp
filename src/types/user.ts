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


export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};


export type EditProfilePayload = {
  firstName: string;
  lastName: string;
  email: string;
  photo?: File;
};

export type ActionResult = {
  success: boolean;
  message?: string;
};