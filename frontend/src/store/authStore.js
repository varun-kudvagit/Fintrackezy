import { create } from "zustand";
import { getToken, removeToken, setToken } from "../utils/helpers";
import { getUserInfoFn } from "../apis/userApis";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    setToken(token);
    set({ user, token });
  },

  logout: () => {
    removeToken();
    set({ token: null, user: null });
  },

  initializeAuth: async () => {
    const storedToken = getToken();
    if (storedToken) {
      try {
        const { user: userData } = await getUserInfoFn();
        set({
          token: storedToken,
          user: userData,
        });
      } catch (err) {
        console.error("Auth init failed:", err);
        set({ token: null, user: null }); // logout method called of store
      }
    }
  },
}));

export default useAuthStore;
