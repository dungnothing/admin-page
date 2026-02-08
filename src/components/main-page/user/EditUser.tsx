import { useNavigate, useSearchParams } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import FormProvider from "@/components/common/hook-form/FormProvider"
import { useForm } from "react-hook-form"
import * as v from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot"
import RHFInputCustom from "@/components/common/hook-form/RHFInputCustom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getUserDetailAPI, updateUserAPI } from "@/apis/admin"
import { toast } from "react-toastify"

const schema = v.object({
  userName: v.pipe(v.string(), v.nonEmpty("Tên người dùng là bắt buộc"), v.minLength(3), v.maxLength(30)),
  address: v.string(),
  phone: v.custom((value: any) => {
    if (!value) return true
    const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/
    return vnPhoneRegex.test(value)
  }, "Số điện thoại không hợp lệ"),
  organization: v.string(),
})

const EditUser = ({ fetchUserList }: any) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleClose = () => {
    navigate("/user")
  }

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      userName: "",
      address: "",
      phone: "",
      organization: "",
    },
  })

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!id) return
      setLoading(true)
      try {
        const userData = await getUserDetailAPI(id)
        form.reset({
          userName: userData.userName || "",
          address: userData.address || "",
          phone: userData.phone || "",
          organization: userData.organization || "",
        })
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Lỗi khi tải thông tin người dùng")
        handleClose()
      } finally {
        setLoading(false)
      }
    }
    fetchUserDetail()
  }, [id])

  const onSubmit = async (data: any) => {
    if (!id) return
    setSubmitting(true)
    try {
      await updateUserAPI(id, data)
      toast.success("Cập nhật thông tin người dùng thành công")
      handleClose()
      fetchUserList()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Lỗi khi cập nhật thông tin người dùng")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Thông tin người dùng">
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      ) : (
        <FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <RHFInputCustom name="userName" label="Tên người dùng" />
            <RHFInputCustom name="address" label="Địa chỉ" />
            <RHFInputCustom name="phone" label="Số điện thoại" />
            <RHFInputCustom name="organization" label="Tổ chức" />
            <div className="flex justify-end gap-2">
              <Button variant="secondary-outline" color="gray" onClick={handleClose} disabled={submitting}>
                Hủy
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </div>
        </FormProvider>
      )}
    </BasicDialog>
  )
}

export default EditUser
