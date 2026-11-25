import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import {
  type ContentItem,
  ContentStatus,
  ContentType,
} from "@/features/content/content";
import { addContentItem } from "@/features/content/content-mock";

type CreateContentRequest = {
  title: string;
  type: ContentType;
  deadline: string;
};

type CreateContentResponse = ContentItem | { error: string };

const isValidContentType = (value: string): value is ContentType =>
  Object.values(ContentType).some((contentType) => contentType === value);

export const createContent = async (
  request: NextRequest,
): Promise<NextResponse<CreateContentResponse>> => {
  const cookieStore = await cookies();
  const user = getAuthCookie(cookieStore);

  if (!user) {
    return NextResponse.json<CreateContentResponse>(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  let body: CreateContentRequest;

  try {
    body = (await request.json()) as CreateContentRequest;
  } catch {
    return NextResponse.json<CreateContentResponse>(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const deadline = typeof body.deadline === "string" ? body.deadline : "";
  // Matches the YYYY-MM-DD format (for example, 2026-12-04).
  const isValidDeadline = /^\d{4}-\d{2}-\d{2}$/.test(deadline);

  if (!title || !isValidContentType(body.type) || !isValidDeadline) {
    return NextResponse.json<CreateContentResponse>(
      { error: "Provide a title, valid type, and deadline." },
      { status: 400 },
    );
  }

  const item: ContentItem = {
    id: randomUUID(),
    title,
    status: ContentStatus.Idea,
    authors: [{ id: user.id, name: user.name }],
    createdBy: { id: user.id, name: user.name },
    deadline,
    type: body.type,
  };

  addContentItem(item);

  return NextResponse.json<CreateContentResponse>(item, { status: 201 });
};
