import AppRoutes from "./AppRoutes"
import { useFetchUserInfo } from "@/hooks/useFetchUserInfo"

const App = () => {
  useFetchUserInfo()
  return <AppRoutes />
}

export default App
