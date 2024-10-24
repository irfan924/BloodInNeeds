import { create } from "zustand";

const useStore = create((set) => ({

    authState: false,
    
    setAuthState: (val) => set({ authState: val }),

}));

export default useStore;