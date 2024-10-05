import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../util/authHeader";
import { AuthContextType, UserDataType } from "../_types/context_type";

// // create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// // prepare auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserDataType>({
    firstName: "",
    id: 0,
    role: "",
    token: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const loggedInUser = getAuth();

    loggedInUser.then((response) => {
      if (response != null && response.token != null) {
        setIsLoggedIn(true);
        if (response.role === "admin") {
          setIsAdmin(true);
        } else if (response.role === "super_admin") {
          setIsSuperAdmin(true);
        }
        setUserData(response);
      }
    });
  };

  const values = {
    isAdmin,
    isSuperAdmin,
    userData,
    setUserData,
    setIsSuperAdmin,
    setIsAdmin,
    fetchData,
    setIsLoggedIn,
    isLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useData must be used within a userProvider");
  }
  return context;
};
