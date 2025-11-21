import axiosInstance from "./index"

export const loginAPI = async (loginData: any) => {
  const response = await axiosInstance.post("/v2/admins/login", loginData)
  return response.data
}

export const getUserInfoAPI = async () => {
  const response = await axiosInstance.get("/v2/admins")
  return response.data
}

export const getDashboardAPI = async () => {
  const response = await axiosInstance.get("/v2/admins/dashboard")
  return response.data
}

export const getUserAPI = async (query: any) => {
  const response = await axiosInstance.get("/v2/admins/user", { params: query })
  return response.data
}
