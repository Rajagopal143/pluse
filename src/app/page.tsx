import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
import Image from "next/image";

 
export default async function Home() {
  // const user = await prisma.user.create({ data: { email: "aadbsd", name: "adsbsabv", password: "svajsdjv" } })
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button >SignIn</button>
    </div>
  );
}
