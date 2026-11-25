import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { User } from "@/features/auth/auth";
import { getAuthCookie } from "@/features/auth/auth-cookie";

type SessionResponse =
  | { authenticated: false }
  | { authenticated: true; user: User };

export const GET = async (): Promise<NextResponse<SessionResponse>> => {
  const cookieStore = await cookies();
  const user = getAuthCookie(cookieStore);

  if (!user) {
    return NextResponse.json<SessionResponse>(
      { authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json<SessionResponse>({ authenticated: true, user });
};
