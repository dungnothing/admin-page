import AppRoutes from "./AppRoutes"
import { useFetchUserInfo } from "@/components/auth/useFetchUserInfo"

const App = () => {
  useFetchUserInfo()
  return <AppRoutes />
}

export default App
