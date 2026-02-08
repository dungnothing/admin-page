import { useNavigate, useSearchParams } from "react-router-dom"
import BasicDialog from "@/components/common/basic/BasicDialog"
import { toast } from "react-toastify"
import { BasicSelect } from "@/components/common/basic/BasicSelect"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const UpdateSubcription = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const current = "PRO"
  const [selected, setSelected] = useState<any>("PRO")

  const handleClose = () => {
    navigate("/user")
  }

  const handleSubmit = async () => {
    try {
      console.log(id)
    } catch (error) {
      toast.error("Có lỗi xảy ra")
    }
  }

  return (
    <BasicDialog open={true} onOpenChange={handleClose} title="Nâng cấp gói">
      <p className="text-red-500 underline">Gói hiện tại: {current}</p>
      <div className="flex flex-col gap-2">
        <p>Chọn gói muốn nâng cấp</p>
        <BasicSelect
          options={[
            { label: "PRO", value: "PRO" },
            { label: "PREMIUM", value: "PREMIUM" },
          ]}
          value={selected}
          onChange={(value) => setSelected(value)}
        />
        <p className="text-body-md text-tertiary">Lưu ý rằng gói nâng cấp lên sẽ không được thấp hơn gói hiện có.</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary-outline" color="gray" onClick={handleClose}>
          Hủy
        </Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </div>
    </BasicDialog>
  )
}

export default UpdateSubcription
