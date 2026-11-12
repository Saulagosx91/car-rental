import { createContext } from "react";
import type { User } from "../types";

interface ContextType {
  isAuth: boolean | null;
  isLoading: boolean;
  user: User | null;
  isAdmin: boolean | null;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<ContextType>({} as ContextType);