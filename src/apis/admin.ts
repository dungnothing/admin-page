import axiosInstance from "./index"

export const loginAPI = async (loginData: any) => {
  const response = await axiosInstance.post("/v1/admins/login", loginData)
  return response.data
}

export const getUserInfoAPI = async () => {
  const response = await axiosInstance.get("/v1/admins")
  return response.data
}
