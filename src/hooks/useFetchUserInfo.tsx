// @/hooks/useFetchUserInfo.ts
import { useEffect } from "react"
import { getUserInfoAPI } from "@/apis/admin"
import { userStore } from "@/stores/index"
import { getAuthToken } from "@/utils/auth"

export const useFetchUserInfo = () => {
  const setUser = userStore((state: any) => state.setUser)
  const token = getAuthToken()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return
        const data = await getUserInfoAPI()
        setUser(data)
      } catch (err) {
        console.error("Fetch user info failed:", err)
      }
    }

    fetchUser()
  }, [])
}
