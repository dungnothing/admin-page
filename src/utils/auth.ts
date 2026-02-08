import Cookies from "js-cookie"

const ADMIN_TOKEN = "accessAdminToken"
const REFRESH_TOKEN = "refreshAdminToken"
const TOKEN_EXPIRATION_TIME = 2
const REFRESH_TOKEN_EXPIRATION_TIME = 14

export const setAuth = (accessToken: string, refreshToken: string) => {
  Cookies.set(ADMIN_TOKEN, accessToken, { expires: TOKEN_EXPIRATION_TIME, secure: true, sameSite: "strict", path: "/" })
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    expires: REFRESH_TOKEN_EXPIRATION_TIME,
    secure: true,
    sameSite: "strict",
    path: "/",
  })
}

export const getAuthToken = () => {
  return Cookies.get(REFRESH_TOKEN)
}

export const removeAuth = () => {
  Cookies.remove(ADMIN_TOKEN)
  Cookies.remove(REFRESH_TOKEN)
}

export const isAuthenticated = () => {
  const token = getAuthToken()
  return !!token
}

export const logout = () => {
  removeAuth()
  window.location.href = "/"
}
