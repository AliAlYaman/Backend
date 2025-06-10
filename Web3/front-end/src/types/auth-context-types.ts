export interface Credentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  accessToken: string | null;
  login: (creds: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
