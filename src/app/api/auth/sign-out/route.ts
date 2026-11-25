import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/features/auth/auth-cookie";

type SignOutResponse = {
  signedOut: true;
};

export async function POST(): Promise<NextResponse<SignOutResponse>> {
  const response = NextResponse.json<SignOutResponse>({ signedOut: true });

  clearAuthCookie(response);

  return response;
}
