import axios from "axios"
import { API_ROOT } from "@/utils/constant"
import Cookies from "js-cookie"

// Biến cục bộ để chặn refresh lặp lại
let isRefreshing = false
let failedQueue: any = []

// Hàm xử lý hàng chờ khi refresh xong
const processQueue = (error = null, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

// Hàm gọi refresh token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshAdminToken")
  if (!refreshToken) throw new Error("No refresh token")

  const response = await axios.post(`${API_ROOT}/v1/admins/refreshToken`, { refreshToken })
  const newAccessToken = response.data?.accessToken
  if (newAccessToken) {
    document.cookie = `accessAdminToken=${newAccessToken}; path=/; max-age=${60 * 60}`
    return newAccessToken
  }
  throw new Error("Failed to refresh token")
}

// Tạo instance axios mặc định
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
})

// ✅ Interceptor: tự động gắn token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessAdminToken")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// ✅ Interceptor: tự động refresh token nếu token hết hạn
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Nếu lỗi 401 và chưa retry
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, chờ refresh xong rồi retry
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axiosInstance(originalRequest)
          })
          .catch(Promise.reject)
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newToken = await refreshAccessToken()
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } catch (err: any) {
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
