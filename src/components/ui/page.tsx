import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Page({className, ...props}: ComponentProps<'div'>) {
  return (
    <div className={cn('p-4 h-full', className)} {...props} />
  )
}

function PageHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mb-4', className)} {...props} />
  )
}

function PageHeaderTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2 className={cn(className)} {...props} />
  )
}

function PageHeaderSubtitle({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('text-[14px] text-gray-500', className)} {...props} />
  )
}

function PageFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mt-4', className)} {...props} />
  )
}

export {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderSubtitle,
  PageFooter,
}
