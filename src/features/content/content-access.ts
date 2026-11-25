import type { User } from "@/features/auth/auth";
import type { ContentItem } from "./content";

export const canManageContent = (item: ContentItem, user: User) =>
  user.role === "Editor" ||
  item.authors.some((author) => author.id === user.id);
