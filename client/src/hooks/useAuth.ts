import { useState, useEffect } from 'react';
import { UserService } from '../services/user.service';
import type { User } from '../types';

const userService = new UserService();

export function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await userService.checkAuth();
        setUser(userData);
        setIsAuth(true);
      } catch {
        setUser(null);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuth, user, isLoading };
}
