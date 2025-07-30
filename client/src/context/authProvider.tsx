import { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../api/auth';
type User = {
  fullName: string;
  email: string;
  _id: string;
};
type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
