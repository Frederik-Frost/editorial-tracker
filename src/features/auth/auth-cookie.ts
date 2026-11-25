import type { NextResponse } from "next/server";
import type { User } from "./auth";

export const AUTH_COOKIE_NAME = "auth";

export const setAuthCookie = (response: NextResponse, user: User) => {
  response.cookies.set(AUTH_COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 15 * 60, // 15 minutes in seconds
  });
};

export const clearAuthCookie = (response: NextResponse) => {
  response.cookies.delete(AUTH_COOKIE_NAME);
};

export const getAuthCookie = (cookieStore: {
  get: (name: string) => { value: string } | undefined;
}): User | undefined => {
  const value = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!value) return undefined;

  try {
    return JSON.parse(value) as User;
  } catch {
    return undefined;
  }
};
