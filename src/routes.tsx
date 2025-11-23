import { ReactNode } from "react"
import AppLayout from "./layout/AppLayout"
import Home from "./pages/Dashboard/Home"
import UserList from "./pages/UserList"
import Calendar from "./pages/Calendar"
import Blank from "./pages/Blank"
import FormElements from "./pages/Forms/FormElements"
import BasicTables from "./pages/Tables/BasicTables"
import Alerts from "./pages/UiElements/Alerts"
import Avatars from "./pages/UiElements/Avatars"
import Badges from "./pages/UiElements/Badges"
import Buttons from "./pages/UiElements/Buttons"
import Images from "./pages/UiElements/Images"
import Videos from "./pages/UiElements/Videos"
import LineChart from "./pages/Charts/LineChart"
import BarChart from "./pages/Charts/BarChart"
import SignIn from "./pages/AuthPages/SignIn"
import EditUser from "./components/main-page/user/EditUser"
import UpdateSubcription from "./components/main-page/user/UpdateSubcription"
import NotFound from "./pages/OtherPage/NotFound"
import { Navigate, redirect } from "react-router-dom"
import { isAuthenticated } from "./utils/auth"
import CreateUser from "./components/main-page/user/CreateUser"

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
    // loader: dashboardLoader,
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
      { path: "/calendar", element: <Calendar /> },
      { path: "/blank", element: <Blank /> },
      { path: "/form-elements", element: <FormElements /> },
      { path: "/basic-tables", element: <BasicTables /> },
      { path: "/alerts", element: <Alerts /> },
      { path: "/avatars", element: <Avatars /> },
      { path: "/badge", element: <Badges /> },
      { path: "/buttons", element: <Buttons /> },
      { path: "/images", element: <Images /> },
      { path: "/videos", element: <Videos /> },
      { path: "/line-chart", element: <LineChart /> },
      { path: "/bar-chart", element: <BarChart /> },
    ],
  },
  { path: "/signin", element: <SignIn />, loader: loginLoader },
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Navigate to="/signin" replace />, loader: loginLoader },
]
