import { ReactNode } from "react"
import AppLayout from "./layout/AppLayout"
import Home from "./pages/Dashboard/Home"
import UserList from "./pages/UserList"
import BasicTables from "./pages/Tables/BasicTables"
import SignIn from "./pages/AuthPages/SignIn"
import NotFound from "./pages/OtherPage/NotFound"
import { Navigate, redirect } from "react-router-dom"
import { isAuthenticated } from "./utils/auth"
import AdminPage from "./pages/Admin/AdminPage"

export interface AppRoute {
  path?: string
  element: ReactNode
  children?: AppRoute[]
  loader?: () => any
}

const loginLoader = () => {
  if (isAuthenticated()) {
    throw redirect("/dashboard")
  }
  return null
}

const dashboardLoader = () => {
  if (!isAuthenticated()) {
    throw redirect("/signin")
  }
  return null
}

export const routes: AppRoute[] = [
  {
    element: <AppLayout />,
    loader: dashboardLoader,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/user", element: <UserList /> },
      { path: "/board", element: <BasicTables /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
  { path: "/signin", element: <SignIn />, loader: loginLoader },
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Navigate to="/signin" replace />, loader: loginLoader },
]
