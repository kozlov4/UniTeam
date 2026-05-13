import { create } from "zustand";

const stored = localStorage.getItem("user-auth");
const initialState = stored ? JSON.parse(stored) : null;

export const useUserStore = create((set) => ({
  user: initialState?.user || null,
  accessToken: initialState?.accessToken || null,
  refreshToken: initialState?.refreshToken || null,

  setAuth: (user, accessToken, refreshToken) => {
    const authData = { user, accessToken, refreshToken };
    set(authData);
    localStorage.setItem("user-auth", JSON.stringify(authData));
  },

  clearAuth: () => {
    set({ user: null, accessToken: null, refreshToken: null });
    localStorage.removeItem("user-auth");
  },
}));
