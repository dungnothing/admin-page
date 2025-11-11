import { createRoot } from "react-dom/client"
import "./index.css"
import "swiper/swiper-bundle.css"
import "flatpickr/dist/flatpickr.css"
import App from "./App.tsx"
import { ThemeProvider } from "./context/ThemeContext.tsx"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Zoom } from "react-toastify"

createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
    </ThemeProvider>
  </>,
)
