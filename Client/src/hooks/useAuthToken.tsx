// hooks/useAuthToken.ts
import { useState, useEffect } from 'react';

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return token;
};