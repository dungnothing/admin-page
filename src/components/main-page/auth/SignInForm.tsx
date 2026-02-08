import { useState } from "react"
import { EyeCloseIcon, EyeIcon } from "../../../icons"
import Label from "../../form/Label"
import Button from "../../ui/button/Button"
import * as v from "valibot"
import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import FormProvider from "@/components/common/hook-form/FormProvider"
import { RHFInput } from "../../common/hook-form/RHFInput"
import { loginAPI } from "@/apis/admin"
import { toast } from "react-toastify"
import { userStore } from "@/stores/index"
import { useNavigate } from "react-router-dom"
import { setAuth } from "@/utils/auth"
import { onError } from "@/hooks/useErrorMessage"

const loginSchema = v.object({
  userName: v.pipe(v.string("Tên đăng nhập là bắt buộc"), v.nonEmpty("Tên đăng nhập là bắt buộc")),
  password: v.pipe(
    v.string("Mật khẩu là bắt buộc"),
    v.nonEmpty("Mật khẩu là bắt buộc"),
    v.minLength(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  ),
})

export default function SignInForm() {
  const navigate = useNavigate()
  const setUser = userStore((state: any) => state.setUser)
  const form = useForm({
    resolver: valibotResolver(loginSchema),
    mode: "all",
    defaultValues: {
      userName: "",
      password: "",
    },
  })
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = async (data: any) => {
    try {
      const response = await loginAPI(data)
      setUser({
        id: response.id,
        userName: response.userName,
        isOwner: response.isOwner,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      })
      setAuth(response.accessToken, response.refreshToken)

      toast.success("Đăng nhập thành công")
      navigate("/dashboard")
    } catch (error: any) {
      onError(error)
    }
  }
  return (
    <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)} className="w-[50vw]">
      <div className="flex flex-col flex-1 h-full">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Đăng nhập
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chào mừng bạn đến với Wednesday Admin</p>
            </div>
            <div>
              <div className="space-y-6">
                <div>
                  <Label>
                    Tên đăng nhập <span className="text-error-500">*</span>{" "}
                  </Label>
                  <RHFInput placeholder="Enter your user name" name="userName" />
                </div>
                <div>
                  <Label>
                    Mật khẩu <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <RHFInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-[22px]"
                    >
                      {showPassword ? (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Đăng nhập
                  </Button>
                  {/* <Button onClick={() => navigate("/dashboard")}>Vào luôn</Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
