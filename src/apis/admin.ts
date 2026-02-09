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

export const getUserDetailAPI = async (id: string) => {
  const response = await axiosInstance.get(`/v2/admins/user/${id}`)
  return response.data
}

export const updateUserAPI = async (id: string, data: any) => {
  const response = await axiosInstance.put(`/v2/admins/user/${id}`, data)
  return response.data
}

export const createUserAPI = async (data: any) => {
  const response = await axiosInstance.post("/v2/admins/user", data)
  return response.data
}

export const deleteUserAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/v2/admins/user/${id}`)
  return response.data
}

export const getBoardMembersAPI = async (boardId: string) => {
  const response = await axiosInstance.get(`/v2/admins/board/${boardId}/members`)
  return response.data
}

export const addMemberToBoardAPI = async (boardId: string, email: string) => {
  const response = await axiosInstance.post(`/v2/admins/board/${boardId}/members`, { email })
  return response.data
}

export const removeMemberFromBoardAPI = async (boardId: string, memberId: string) => {
  const response = await axiosInstance.delete(`/v2/admins/board/${boardId}/members/${memberId}`)
  return response.data
}

export const deleteBoardAPI = async (id: string) => {
  const response = await axiosInstance.delete(`/v2/admins/board/${id}`)
  return response.data
}

export const getBoardDetailAPI = async (id: string) => {
  const response = await axiosInstance.get(`/v2/admins/board/${id}`)
  return response.data
}

export const getPaymentsAPI = async (query: any) => {
  const response = await axiosInstance.get(`/v2/payments`, { params: query })
  return response.data
}

export const createTemplateAPI = async (data: any) => {
  const response = await axiosInstance.post("/v2/templates", data)
  return response.data
}

export const getTemplatesAPI = async () => {
  const response = await axiosInstance.get("/v2/templates")
  return response.data
}
