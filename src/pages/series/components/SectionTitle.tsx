"use client";
interface SectionTitleProps{
  children?:React.ReactNode
  tag:string
  className?:string
}
export default function SectionTitle({tag,children, className=""}:SectionTitleProps) {
  return (
    <h1 className={`font-bold text-xl md:text-3xl ${className}`}>{tag||children}</h1>
  )
}