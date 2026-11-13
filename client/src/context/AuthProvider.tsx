import { useState, useEffect } from "react";
import { UserService } from "../services/user.service";
import { AuthContext } from "./AuthContext";
import type { User } from "../types";

const userService = new UserService();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    try {
      await userService.logout();
    } catch {
      // ignore
    }
    setUser(null);
    setIsAuth(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await userService.checkAuth();
        setUser(userData);
        setIsAuth(true);

        try {
          const adminData = await userService.checkAdminAuth();
          if (adminData) {
            setUser(adminData);
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch {
          setIsAdmin(false);
        }
      } catch {
        setUser(null);
        setIsAuth(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, isAdmin, isLoading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
