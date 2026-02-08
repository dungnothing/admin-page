// Kho lưu trữ với zustand
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export const userStore = create(
  devtools(
    (set) => ({
      user: null,
      setUser: (user: any) => set({ user }, false, "setUser"),
      isOpenMenu: true,
      setIsOpenMenu: (isOpenMenu: boolean) => set({ isOpenMenu }, false, "setIsOpenMenu"),
      clearUser: () => set({ user: null }, false, "clearUser"),
    }),
    { name: "UserStore" },
  ),
)
