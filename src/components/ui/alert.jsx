// components/ui/alert.jsx
import * as React from "react"
import { cn } from "../lib/utils"

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4",
      {
        "bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800": variant === "default",
        "border-red-500/50 text-red-600 dark:border-red-500 dark:text-red-500": variant === "destructive",
      },
      className
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }