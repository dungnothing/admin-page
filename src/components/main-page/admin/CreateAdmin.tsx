import { useNavigate } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import FormProvider from "@/components/common/hook-form/FormProvider"
import { useForm } from "react-hook-form"
import * as v from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot"
import RHFInputCustom from "@/components/common/hook-form/RHFInputCustom"
import { Button } from "@/components/ui/button"
import { createAdminAPI } from "@/apis/admin"
import { toast } from "react-toastify"

const schema = v.object({
  userName: v.pipe(
    v.string(),
    v.nonEmpty("Tên admin là bắt buộc"),
    v.minLength(3, "Tối thiểu 3 ký tự"),
    v.maxLength(30),
    v.regex(/^[a-zA-Z0-9_-]+$/, "Không được ký tự đặc biệt"),
  ),
  email: v.pipe(v.string(), v.email("Email không hợp lệ"), v.nonEmpty("Email là bắt buộc")),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Mật khẩu là bắt buộc"),
    v.minLength(6, "Tối thiểu 6 ký tự"),
    v.maxLength(30),
  ),
})

const CreateAdmin = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/admin")
  }

  const onSubmit = async (data: any) => {
    try {
      await createAdminAPI(data)
      toast.success("Tạo admin thành công")
      navigate("/admin")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo admin")
    }
  }

  const form = useForm({
    resolver: valibotResolver(schema),
    mode: "all",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Tạo mới Admin">
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <RHFInputCustom name="userName" label="Tên Admin" required />
          <RHFInputCustom name="email" label="Email" required />
          <RHFInputCustom name="password" label="Mật khẩu" type="password" required />
          <div className="flex justify-end gap-2">
            <Button variant="secondary-outline" color="gray" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
              Lưu
            </Button>
          </div>
        </div>
      </FormProvider>
    </BasicDialog>
  )
}

export default CreateAdmin
