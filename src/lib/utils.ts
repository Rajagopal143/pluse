import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const SECRET_KEY = process.env.NEXTAUTH_SECRET || "StartupTn"; // Secret word

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Salt rounds determine the complexity of the hash
  const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password
  return hashedPassword;
}

// Function to verify the password
export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(inputPassword, storedHash); // Compare password with hash
  return isMatch;
}
