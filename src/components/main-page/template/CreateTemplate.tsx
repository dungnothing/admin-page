import { useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, X, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import BasicDialog from "@/components/common/basic/BasicDialog"
import { Button } from "@/components/ui/button"
import Label from "@/components/form/Label"
import { RHFInput } from "@/components/common/hook-form/RHFInput"
import FormProvider from "@/components/common/hook-form/FormProvider"
import Input from "@/components/form/input/InputField"
import { valibotResolver } from "@hookform/resolvers/valibot"
import * as v from "valibot"
import { createTemplateAPI } from "@/apis/admin"

interface Card {
  id: string
  title: string
}

interface Column {
  id: string
  title: string
  cards: Card[]
}

interface CreateTemplateProps {
  fetchTemplateList?: () => void
}

const schema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, "Tên mẫu không được để trống")),
  backgroundImageLink: v.pipe(v.string(), v.trim(), v.minLength(1, "Link ảnh nền không được để trống")),
})

const CreateTemplate = ({ fetchTemplateList }: CreateTemplateProps) => {
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState<Column[]>([])
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const [newCardTitles, setNewCardTitles] = useState<{ [key: string]: string }>({})

  const methods = useForm({
    defaultValues: {
      name: "",
      backgroundImageLink: "",
    },
    resolver: valibotResolver(schema),
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title: newColumnTitle,
      cards: [],
    }
    setColumns([...columns, newColumn])
    setNewColumnTitle("")
  }

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId))
  }

  const handleAddCard = (columnId: string) => {
    const cardTitle = newCardTitles[columnId]
    if (!cardTitle?.trim()) return

    const newCard: Card = {
      id: crypto.randomUUID(),
      title: cardTitle,
    }

    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, cards: [...col.cards, newCard] }
        }
        return col
      }),
    )

    setNewCardTitles({ ...newCardTitles, [columnId]: "" })
  }

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns(
      columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
        }
        return col
      }),
    )
  }

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        columns: columns,
      }

      await createTemplateAPI(payload)

      toast.success("Tạo mẫu thành công")
      reset()
      setColumns([])
      setOpen(false)
      fetchTemplateList?.()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi tạo mẫu")
    }
  }

  return (
    <BasicDialog
      open={open}
      onOpenChange={setOpen}
      className="min-w-[900px]"
      title="Thêm mẫu mới"
      trigger={
        <Button variant="primary" color="brand">
          Thêm mẫu
        </Button>
      }
    >
      <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar px-2">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label>
                Tên mẫu <span className="text-red-500">*</span>
              </Label>
              <RHFInput name="name" placeholder="Nhập tên mẫu..." />
            </div>

            <div>
              <Label>
                Link ảnh nền <span className="text-red-500">*</span>
              </Label>
              <RHFInput name="backgroundImageLink" placeholder="Nhập link ảnh nền..." />
            </div>
          </div>

          <div className="border-t pt-4">
            <Label>Cấu trúc bảng</Label>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[400px] overflow-auto">
              <div className="flex gap-4 items-start h-full">
                {columns.map((column) => (
                  <div key={column.id} className="flex-shrink-0 w-60 rounded-lg bg-gray-100 p-3 flex flex-col gap-3 ">
                    <div className="flex justify-between items-center px-1">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-200 truncate">{column.title}</h4>
                      <button
                        type="button"
                        onClick={() => handleDeleteColumn(column.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Cards List */}
                    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                      {column.cards.map((card) => (
                        <div
                          key={card.id}
                          className="group relative bg-white dark:bg-gray-700 p-2.5 rounded shadow-sm border border-gray-200 dark:border-gray-600 hover:border-brand-300 dark:hover:border-brand-500 transition-colors"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-200 break-words">{card.title}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCard(column.id, card.id)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 bg-white/80 dark:bg-gray-700/80 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Card Input */}
                    <div className="mt-auto pt-2">
                      {/* Use a wrapper to enforce width if needed, or pass full width class to Input if supported */}
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Thêm thẻ..."
                            value={newCardTitles[column.id] || ""}
                            onChange={(e) => setNewCardTitles({ ...newCardTitles, [column.id]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddCard(column.id)
                              }
                            }}
                            className="!h-10"
                          />
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary-light"
                          className="h-10 w-10 p-0 flex-shrink-0"
                          onClick={() => handleAddCard(column.id)}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Column Box */}
                <div className="min-w-60 bg-gray-100 rounded-lg p-3 flex gap-2">
                  <Input
                    placeholder="Nhập tên cột mới..."
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddColumn()
                      }
                    }}
                    className="bg-white dark:bg-gray-900 !h-10 w-full"
                  />
                  <Button
                    type="button"
                    variant="secondary-outline"
                    onClick={handleAddColumn}
                    disabled={!newColumnTitle.trim()}
                    className="h-10"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button type="button" variant="secondary-outline" color="gray" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" color="brand" disabled={isSubmitting}>
              {isSubmitting ? "Đang tạo..." : "Tạo mẫu"}
            </Button>
          </div>
        </FormProvider>
      </div>
    </BasicDialog>
  )
}

export default CreateTemplate
