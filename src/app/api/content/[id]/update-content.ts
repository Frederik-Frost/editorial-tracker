import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { getAuthCookie } from "@/features/auth/auth-cookie";
import {
  type ContentItem,
  ContentStatus,
  ContentType,
} from "@/features/content/content";
import { canManageContent } from "@/features/content/content-access";
import { contentAuthors } from "@/features/content/content-authors";
import {
  findContentItem,
  replaceContentItem,
} from "@/features/content/content-mock";

type UpdateContentRequest = Pick<
  ContentItem,
  "title" | "status" | "deadline" | "type"
> & { authors: string[] };
type UpdateContentResponse = ContentItem | { error: string };

const isValidContentType = (value: unknown): value is ContentType =>
  Object.values(ContentType).some((contentType) => contentType === value);

const isValidContentStatus = (value: unknown): value is ContentStatus =>
  Object.values(ContentStatus).some((contentStatus) => contentStatus === value);

export const updateContent = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<UpdateContentResponse>> => {
  const user = getAuthCookie(await cookies());

  if (!user) {
    return NextResponse.json<UpdateContentResponse>(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const item = findContentItem(id);

  if (!item || !canManageContent(item, user)) {
    return NextResponse.json<UpdateContentResponse>(
      { error: "Content item not found." },
      { status: 404 },
    );
  }

  let body: Partial<UpdateContentRequest>;

  try {
    body = (await request.json()) as Partial<UpdateContentRequest>;
  } catch {
    return NextResponse.json<UpdateContentResponse>(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const deadline = typeof body.deadline === "string" ? body.deadline : "";
  const authorIds = Array.isArray(body.authors) ? body.authors : [];
  const authors = contentAuthors.filter((author) =>
    authorIds.includes(author.id),
  );
  const isValidDeadline = /^\d{4}-\d{2}-\d{2}$/.test(deadline);

  if (
    !title ||
    !isValidContentStatus(body.status) ||
    !isValidContentType(body.type) ||
    authorIds.length === 0 ||
    authors.length !== authorIds.length ||
    !isValidDeadline
  ) {
    return NextResponse.json<UpdateContentResponse>(
      { error: "Provide a title, valid status, valid type, and deadline." },
      { status: 400 },
    );
  }

  const updatedItem: ContentItem = {
    ...item,
    title,
    status: body.status,
    authors,
    deadline,
    type: body.type,
  };

  replaceContentItem(updatedItem);

  return NextResponse.json<UpdateContentResponse>(updatedItem);
};
