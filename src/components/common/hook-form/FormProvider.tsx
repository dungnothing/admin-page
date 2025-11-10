import React from "react"
import { FormProvider as Form } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"

type Props = {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function FormProvider({ children, onSubmit, methods, className }: Props) {
  return (
    <Form {...methods}>
      <form
        onSubmit={onSubmit}
        className={className}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
          }
        }}
      >
        {children}
      </form>
    </Form>
  )
}
