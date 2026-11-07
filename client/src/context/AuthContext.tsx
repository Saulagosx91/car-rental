import { createContext } from "react";
import type { User } from "../types";

interface ContextType {
  isAuth: boolean | null;
  isLoading: boolean;
  user: User | null;
  isAdmin: boolean | null;
}
export const AuthContext = createContext<ContextType>({} as ContextType);