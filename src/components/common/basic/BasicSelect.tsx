import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/utils/constant"
import { X } from "lucide-react"

export interface SelectOption {
  label: string
  value: string | number | null
  disabled?: boolean
}

interface BasicSelectProps {
  options: SelectOption[]
  value?: string | number | null
  onChange?: (value: string | number | null) => void
  onBlur?: () => void
  placeholder?: string
  className?: string
  contentClassName?: string
  clearable?: boolean
  disabled?: boolean
  error?: string
  size?: "pagination-sm" | "sm" | "default" | "lg" | "custom" | "xl"
  truncateValue?: boolean
  type?: "default" | "table-cell"
  title?: string
}

export const BasicSelect = ({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  contentClassName,
  clearable = false,
  disabled = false,
  error = "",
  size = "lg",
  truncateValue = false,
  type = "default",
  title,
}: BasicSelectProps) => {
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onChange) {
      onChange(null)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && onBlur) {
      onBlur()
    }
  }

  const handleValueChange = (selectedValue: string) => {
    if (onChange) {
      // Find the original option to get the correct type (string or number)
      const option = options.find((opt) => String(opt.value) === selectedValue)
      if (option) {
        onChange(option.value)
      }
    }
  }

  // Ensure consistent controlled behavior
  const selectValue = value !== null && value !== undefined ? String(value) : ""

  return (
    <div className="w-full relative flex flex-col gap-1">
      <Select value={selectValue} onValueChange={handleValueChange} onOpenChange={handleOpenChange} disabled={disabled}>
        <SelectTrigger
          size={size}
          className={cn(
            "justify-between w-full",
            // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            // error && "ring-destructive/20 dark:ring-destructive/40 border-destructive",
            truncateValue && "[&>span]:!line-clamp-1 [&>span]:!whitespace-normal [&>span]:!mr-3",
            type === "table-cell" && "border-0 shadow-none focus-visible:ring-0 focus-visible:border-transparent",
            type === "table-cell" && error && "data-[placeholder]:text-component-input-text-content-placeholder-error",
            className,
          )}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName} align="end">
          {title && <div className="px-5 pt-3 pb-2 text-label-lg font-medium text-tertiary">{title}</div>}
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
          {options.length === 0 && (
            <SelectItem value="none" disabled>
              Không có lựa chọn nào
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      {clearable && value !== null && value !== undefined && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted transition-colors z-10"
          aria-label="Clear selection"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        </button>
      )}
    </div>
  )
}
