export type AuthContextType = {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuperAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
};

export type UserDataType = {
  id: number;
  firstName: string;
  role: string;
  token: string | null;
};
