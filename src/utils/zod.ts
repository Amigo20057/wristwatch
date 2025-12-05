import { object, string } from "zod";

export const signInSchema = object({
  email: string().min(1, "Email is required").email("Invalid email"),
  password: string()
    .min(1, "Password is required")
    .min(5, "Password must be more than 5 characters")
    .max(32, "Password must be less than 32 characters"),
});
