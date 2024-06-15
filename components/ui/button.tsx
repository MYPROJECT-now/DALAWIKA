import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold font-dongle text-2xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
        default: "bg-white text-black borer-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary: "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
        secondary: "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
        danger: "bg-rose-400 text-primary-foreground hover:bg-rose-400/90 border-rose-500 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100 border-2 border-rose-500",
        super: "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        ghost: "bg-transparent text-slate-500  border-trasnparent border-0 hover:bg-slate-200",
        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",

        //new prg1
        login: "bg-transparent text-red-400  border-trasnparent border-0 hover:bg-slate-200",
        button: "bg-button text-muted-foreground border-2 border-transparent hover:bg-click transition-none",
        button2: "bg-transparent text-muted-foreground border-2 border-transparent hover:bg-click2 transition-none",

        //cyrem
        getStarted: "bg-getStarted text-primary-foreground hover:bg-getStartedHover border-getStartedBorder border-b-4 active:border-b-0",
        SignIn: "text-SignIn text-[15px] hover:bg-SignInHover border-SignIn border-2 border-active:border-0 active:bg-SignIn",
        sidebar1: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-SidebarHover transition-none",
        sidebarOutline1: "bg-SidebarHover text-SidebarBorder border-SidebarBorder border-2 hover:SidebarHover transition-none",
        lesson: "bg-SidebarBorder border-b-lesson_bb border-b-4 transition-none active:border-b-0 ",
        Locked: "bg-Locked border-Locked_bb border-b-4 active:border-b-0 ",

        pro: "bg-indigo-400 text-neutral-100 hover:bg-getStartedHover border-getStartedBorder border-b-4 active:border-b-0",
        point: "bg-orange-300",
        heart: "bg-red-500",
        x: "text-slate-100 text-center transition cursor-pointer w-[40px] h-[38px] bg-red-500"
        
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        shop: "w-[490px] h-[77.38px]",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
