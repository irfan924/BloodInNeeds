import { create } from "zustand";

const useStore = create((set) => ({

    authState: false,
    forgotEmail: '',

    setAuthState: (val) => set({ authState: val }),
    setForgotEmail: (val) => set({ forgotEmail: val }),

}));

export default useStore;