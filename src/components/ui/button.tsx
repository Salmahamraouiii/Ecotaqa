import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'emerald'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        const Comp = asChild ? "span" : "button";
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center rounded-xl text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    // Variants
                    variant === 'default' && "bg-white text-slate-950 hover:bg-slate-100",
                    variant === 'outline' && "border border-white/10 bg-transparent hover:bg-white/5 text-white",
                    variant === 'ghost' && "hover:bg-white/5 text-white",
                    variant === 'emerald' && "bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-black shadow-lg shadow-emerald-500/20",
                    // Sizes
                    size === 'default' && "h-11 px-6",
                    size === 'sm' && "h-9 px-3",
                    size === 'lg' && "h-14 px-10 text-base rounded-2xl",
                    size === 'icon' && "h-11 w-11",
                    className
                )}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={ref as any}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
