import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { name, email, password, ...other } = data;
        console.log(name, email)
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exist" });
        }
        console.log(existingUser);
        const hashedPassword =await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const { password: _, ...userData } = user;

        // ✅ Properly return user data
        return NextResponse.json({ data: userData,message:"User Created Successfully" }, { status: 201 });

    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
