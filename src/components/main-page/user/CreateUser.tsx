import { useNavigate, useParams } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import FormProvider from "@/components/common/hook-form/FormProvider"
import { useForm } from "react-hook-form"
import * as v from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot"
import RHFInputCustom from "@/components/common/hook-form/RHFInputCustom"
import { Button } from "@/components/ui/button"

const schema = v.object({
  userName: v.pipe(v.string(), v.nonEmpty("Tên người dùng là bắt buộc"), v.minLength(3), v.maxLength(30)),
  email: v.pipe(v.string(), v.email("Email không hợp lệ"), v.nonEmpty("Email là bắt buộc")),
  password: v.pipe(v.string(), v.nonEmpty("Mật khẩu là bắt buộc"), v.minLength(6), v.maxLength(30)),
  address: v.string(),
  phone: v.custom((value: any) => {
    if (!value) return true

    const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/
    return vnPhoneRegex.test(value)
  }, "Số điện thoại không hợp lệ"),
  organization: v.string(),
})

const CreateUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/user")
  }

  const onSubmit = (data: any) => {
    console.log(data)
    console.log(id)
  }

  const form = useForm({
    resolver: valibotResolver(schema),
    mode: "all",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      organization: "",
    },
  })

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Tạo mới người dùng">
      <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <RHFInputCustom name="userName" label="Tên người dùng" required />
          <RHFInputCustom name="email" label="Email" required />
          <RHFInputCustom name="password" label="Mật khẩu" required />
          <RHFInputCustom name="address" label="Địa chỉ" />
          <RHFInputCustom name="phone" label="Số điện thoại" />
          <RHFInputCustom name="organization" label="Tổ chức" />
          <div className="flex justify-end gap-2">
            <Button variant="secondary-outline" color="gray" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={!form.formState.isValid}>
              Lưu
            </Button>
          </div>
        </div>
      </FormProvider>
    </BasicDialog>
  )
}

export default CreateUser
