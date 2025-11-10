// Make a toast error message
import { toast } from "react-toastify"

export const onError = (error: any) => {
  if (error) {
    toast.error(error.response.data.message || error.message)
  }
}
