import { z } from "zod";


export const LoginFromValidation = z.object({
    email: z.string().email({ message: "please Provide valid Email" }),
    password: z.string()
})