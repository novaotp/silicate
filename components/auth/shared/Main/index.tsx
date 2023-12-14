
import { ChildrenProps } from "@/types/interfaces";

export const Main = ({ children }: ChildrenProps) => {
  return (
    <main className="relative w-full h-[70%] flex flex-col justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
      {children}
    </main>
  )
}
