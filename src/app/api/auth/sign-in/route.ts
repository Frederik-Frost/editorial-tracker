import { type NextRequest, NextResponse } from "next/server";
import type { User } from "@/features/auth/auth";
import { toUser } from "@/features/auth/auth";
import { setAuthCookie } from "@/features/auth/auth-cookie";
import { users } from "@/features/auth/auth-mock";

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = { user: User } | { error: string };

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<SignInResponse>> => {
  try {
    const body = (await request.json()) as SignInRequest;
    // TODO: add zod for request validation
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json<SignInResponse>(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = users.find(
      (candidate) =>
        candidate.email === email && candidate.password === password,
    );

    if (!user) {
      return NextResponse.json<SignInResponse>(
        { error: "Incorrect email or password." },
        { status: 401 },
      );
    }

    const authenticatedUser: User = toUser(user);
    const response = NextResponse.json<SignInResponse>({
      user: authenticatedUser,
    });

    setAuthCookie(response, authenticatedUser);

    return response;
  } catch {
    return NextResponse.json<SignInResponse>(
      { error: "Could not sign in." },
      { status: 500 },
    );
  }
};
