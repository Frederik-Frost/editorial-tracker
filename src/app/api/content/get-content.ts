import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import type { ContentItem } from "@/features/content/content";
import { contentItems } from "@/features/content/content-mock";

type GetContentResponse = ContentItem[] | { error: string };

export const getContent = async (): Promise<
  NextResponse<GetContentResponse>
> => {
  const cookieStore = await cookies();
  const user = getAuthCookie(cookieStore);

  if (!user) {
    return NextResponse.json<GetContentResponse>(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const visibleItems =
    user.role === "Editor"
      ? contentItems
      : contentItems.filter((item) =>
          item.authors.some((author) => author.id === user.id),
        );

  return NextResponse.json<GetContentResponse>(visibleItems);
};
