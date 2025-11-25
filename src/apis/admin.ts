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

export const getBoardAPI = async (query: any) => {
  const response = await axiosInstance.get("/v2/admins/board", { params: query })
  return response.data
}

export const getAllAdminsAPI = async (query: any) => {
  const response = await axiosInstance.get("/v2/admins/list", { params: query })
  return response.data
}

export const deleteAdminAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/v2/admins/${id}`)
  return response.data
}

export const createAdminAPI = async (data: any) => {
  const response = await axiosInstance.post("/v2/admins/create", data)
  return response.data
}
