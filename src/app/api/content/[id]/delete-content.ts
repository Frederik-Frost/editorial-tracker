import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import { canManageContent } from "@/features/content/content-access";
import {
  findContentItem,
  removeContentItem,
} from "@/features/content/content-mock";

type DeleteContentResponse = { error: string };
type RouteContext = { params: Promise<{ id: string }> };

export const deleteContent = async (
  _request: NextRequest,
  { params }: RouteContext,
): Promise<Response> => {
  const user = getAuthCookie(await cookies());

  if (!user) {
    return NextResponse.json<DeleteContentResponse>(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const item = findContentItem(id);

  if (!item || !canManageContent(item, user)) {
    return NextResponse.json<DeleteContentResponse>(
      { error: "Content item not found." },
      { status: 404 },
    );
  }

  removeContentItem(id);

  return new Response(null, { status: 204 });
};
