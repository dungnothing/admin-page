import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { LoaderCircle } from "lucide-react"
import { cn } from "@/utils/constant"

// New design system

const buttonVariants = cva(
  [
    "cursor-pointer",
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",
    "transition-all",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
    "disabled:text-component-input-text-content-disabled",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        primary: "",
        "secondary-light": "",
        "secondary-outline": "",
        "tertiary-ghost": "",
        "tertiary-text": "",
      },
      color: {
        brand: "",
        gray: "",
        "low-warning": "",
        "hi-warning": "",
      },
      shape: {
        default: "",
        square: "",
      },
      size: {
        lg: "",
        md: "",
        sm: "",
        icon: "size-9",
      },
    },
    compoundVariants: [
      // Primary variants
      {
        variant: "primary",
        color: "brand",
        class: [
          "bg-component-button-primary-brand-bg-default",
          "text-component-button-primary-brand-fg-default",
          // "hover:bg-component-button-primary-brand-bg-hover border",
          "disabled:border disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "primary",
        color: "gray",
        class: [
          "bg-component-button-primary-gray-bg-default",
          "text-component-button-primary-gray-fg-default",
          "hover:bg-component-button-primary-gray-bg-hover",
          "disabled:border disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "primary",
        color: "low-warning",
        class: [
          "bg-component-button-primary-md-warning-bg-default",
          "text-component-button-primary-brand-fg-default",
          "hover:bg-component-button-primary-md-warning-bg-hover",
          "disabled:border disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "primary",
        color: "hi-warning",
        class: [
          "bg-component-button-primary-hi-warning-bg-default",
          "text-component-button-primary-hi-warning-fg-default",
          "hover:bg-component-button-primary-hi-warning-bg-hover",
          "disabled:border disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },

      // Secondary Light variants
      {
        variant: "secondary-light",
        color: "brand",
        class: [
          "bg-component-button-light-brand-bg-default",
          "text-component-button-light-brand-fg-default",
          "hover:bg-component-button-light-brand-bg-hover",
          "border border-component-button-light-brand-border",
          "disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "secondary-light",
        color: "gray",
        class: [
          "bg-component-button-light-gray-bg-default",
          "text-primary",
          "hover:bg-component-button-light-gray-bg-hover",
          "border border-component-button-light-gray-border",
          "disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "secondary-light",
        color: "low-warning",
        class: [
          "bg-component-button-light-md-warning-bg-default",
          "text-component-button-light-md-warning-fg-default",
          "hover:bg-component-button-light-md-warning-bg-hover",
          "border border-component-button-light-md-warning-border",
          "disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },
      {
        variant: "secondary-light",
        color: "hi-warning",
        class: [
          "bg-component-button-light-hi-warning-bg-default",
          "text-component-base-icon-red",
          "hover:bg-component-button-light-hi-warning-bg-hover",
          "border border-component-button-light-hi-warning-border",
          "disabled:border-border-gray-disabled disabled:bg-gray-disabled",
        ],
      },

      // Secondary Outline variants
      {
        variant: "secondary-outline",
        color: "brand",
        class: [
          // "bg-component-button-secondary-outline-brand-bg-default",
          "text-component-button-outline-brand-fg-default",
          "hover:bg-component-button-outline-brand-bg-hover",
          "border border-component-button-outline-brand-border",
          "disabled:border-border-gray-disabled",
        ],
      },
      {
        variant: "secondary-outline",
        color: "gray",
        class: [
          // "bg-component-button-outline-gray-bg-default",
          "text-component-button-outline-gray-fg-default",
          "hover:bg-component-button-outline-gray-bg-hover",
          "border border-component-button-outline-gray-border",
          "disabled:border-border-gray-disabled",
        ],
      },
      {
        variant: "secondary-outline",
        color: "low-warning",
        class: [
          // "bg-component-button-outline-low-warning-bg-default",
          "text-component-button-outline-md-warning-fg-default",
          "hover:bg-component-button-outline-md-warning-bg-hover",
          "border border-component-button-outline-md-warning-border",
          "disabled:border-border-gray-disabled",
        ],
      },
      {
        variant: "secondary-outline",
        color: "hi-warning",
        class: [
          // "bg-component-button-outline-hi-warning-bg-default",
          "text-component-button-outline-hi-warning-fg-default",
          "hover:bg-component-button-outline-hi-warning-bg-hover",
          "border border-component-button-outline-hi-warning-border",
          "disabled:border-border-gray-disabled",
        ],
      },

      // Tertiary Ghost variants
      {
        variant: "tertiary-ghost",
        color: "brand",
        class: [
          // "bg-component-button-ghost-brand-bg-default",
          "text-component-button-ghost-brand-fg-default",
          "hover:bg-component-button-ghost-brand-bg-hover",
        ],
      },
      {
        variant: "tertiary-ghost",
        color: "gray",
        class: [
          // "bg-component-button-ghost-gray-bg-default",
          "text-component-button-ghost-gray-fg-default",
          "hover:bg-component-button-ghost-gray-bg-hover",
        ],
      },
      {
        variant: "tertiary-ghost",
        color: "low-warning",
        class: [
          // "bg-component-button-ghost-low-warning-bg-default",
          "text-component-button-ghost-md-warning-fg-default",
          "hover:bg-component-button-ghost-md-warning-bg-hover",
        ],
      },
      {
        variant: "tertiary-ghost",
        color: "hi-warning",
        class: [
          // "bg-component-button-ghost-hi-warning-bg-default",
          "text-component-button-ghost-hi-warning-fg-default",
          "hover:bg-component-button-ghost-hi-warning-bg-hover",
        ],
      },

      // Tertiary Text variants
      {
        variant: "tertiary-text",
        color: "brand",
        class: ["text-component-button-text-brand-fg-default", "hover:text-component-button-text-brand-bg-hover"],
      },
      {
        variant: "tertiary-text",
        color: "gray",
        class: ["text-component-button-text-gray-fg-default", "hover:text-component-button-text-gray-bg-hover"],
      },
      {
        variant: "tertiary-text",
        color: "low-warning",
        class: [
          "text-component-button-text-md-warning-fg-default",
          "hover:text-component-button-text-md-warning-fg-hover",
        ],
      },
      {
        variant: "tertiary-text",
        color: "hi-warning",
        class: [
          "text-component-button-text-hi-warning-fg-default",
          "hover:text-component-button-text-hi-warning-fg-hover",
        ],
      },

      // Shape + Size combinations
      // Default shape (rectangular buttons)
      {
        shape: "default",
        size: "lg",
        class: "component-button-height-lg rounded-component-button-border-radius-lg px-4 py-2",
      },
      {
        shape: "default",
        size: "md",
        class: "component-button-height-md rounded-component-button-border-radius-md px-4 py-2",
      },
      {
        shape: "default",
        size: "sm",
        class: "component-button-height-sm rounded-component-button-border-radius-sm px-3 py-2",
      },

      // Square shape (width = height)
      {
        shape: "square",
        size: "lg",
        class: "size-12 rounded-[10px] p-2",
      },
      {
        shape: "square",
        size: "md",
        class: "size-10 rounded-[8px] p-2",
      },
      {
        shape: "square",
        size: "sm",
        class: "size-8 rounded-[8px] p-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      color: "brand",
      shape: "default",
      size: "md",
    },
  },
)

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
  }

function Button({
  className,
  variant,
  size,
  color,
  shape,
  asChild = false,
  loading,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, shape }), "text-sm font-semibold", className)}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="size-[18px] animate-spin" />
      ) : (
        startIcon && <span className=" w-full flex items-center justify-center">{startIcon}</span>
      )}

      {children && <div className=" w-full flex items-center justify-center gap-2">{children}</div>}

      {endIcon && !loading && <span className=" w-full flex items-center justify-center">{endIcon}</span>}
    </Comp>
  )
}

export { Button, buttonVariants }
