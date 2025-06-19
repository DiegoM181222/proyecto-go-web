export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'user') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}