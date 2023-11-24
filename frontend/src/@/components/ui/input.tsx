import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isvalid?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id = "", isvalid = true, ...props }, ref) => {
    return (
      <>
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-11 rounded-sm w-full border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            {
              'border-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-2': !isvalid,
            }
          )}
          ref={ref}
          {...props}
        />
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
