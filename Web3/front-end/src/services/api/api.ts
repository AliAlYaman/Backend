import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


interface UserData {
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const signup = async (userData: UserData) => {
  const res = await api.post('/auth/signup', userData);
  return res.data;
};

export const login = async (credentials: Credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const refresh = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

// src/lib/api.ts
export const transferCrypto = async (data: {
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  tokenSymbol: string;
  network: string;
}) => {
  try {
    const response = await api.post('/transfer', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Transfer failed");
    }
    throw error;
  }
};


// Get or create a wallet
export const generateWallet = async (cryptoType: string): Promise<{ address: string }> => {
  const res = await api.post('/wallets/generate', { cryptoType });
  return res.data;
};

// Get all user wallets
export const getUserWallets = async (): Promise<Array<{ crypto_type: string; public_key: string }>> => {
  const res = await api.get('/wallets');
  return res.data;
};
