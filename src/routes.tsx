import { ReactNode } from "react"
import AppLayout from "./layout/AppLayout"
import Home from "./pages/Dashboard/Home"
import UserList from "./pages/UserList"
import BasicTables from "./pages/Tables/BasicTables"
import SignIn from "./pages/AuthPages/SignIn"
import EditUser from "./components/main-page/user/EditUser"
import UpdateSubcription from "./components/main-page/user/UpdateSubcription"
import NotFound from "./pages/OtherPage/NotFound"
import { Navigate, redirect } from "react-router-dom"
import { isAuthenticated } from "./utils/auth"
import CreateUser from "./components/main-page/user/CreateUser"
import BoardDetail from "./components/main-page/board/BoardDetail"
import UserManager from "./components/main-page/board/UserManager"
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
      {
        path: "/user",
        element: <UserList />,
        children: [
          { path: ":id/edit", element: <EditUser /> },
          { path: ":id/subscription", element: <UpdateSubcription /> },
          { path: "create", element: <CreateUser /> },
        ],
      },
      {
        path: "/board",
        element: <BasicTables />,
        children: [
          { path: ":id/detail", element: <BoardDetail /> },
          { path: ":id/user-manager", element: <UserManager /> },
        ],
      },
      { path: "/admin", element: <AdminPage />, children: [{ path: "create", element: <CreateUser /> }] },
    ],
  },
  { path: "/signin", element: <SignIn />, loader: loginLoader },
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Navigate to="/signin" replace />, loader: loginLoader },
]
