// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/googleAuth/googleAuth";

export const { GET, POST } = handlers;