"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContentItem, ContentType } from "@/features/content/content";

type GetContentResponse = ContentItem[] | { error: string };
type CreateContentResponse = ContentItem | { error: string };
type CreateContentInput = {
  title: string;
  type: ContentType;
  deadline: string;
};

export const contentQueryKey = ["content"];

const getContent = async (): Promise<ContentItem[]> => {
  const response = await fetch("/api/content");
  const data = (await response.json()) as GetContentResponse;

  if (!response.ok || !Array.isArray(data)) {
    throw new Error(
      Array.isArray(data) ? "Could not load content." : data.error,
    );
  }

  return data;
};

const postContent = async (input: CreateContentInput): Promise<ContentItem> => {
  const response = await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as CreateContentResponse;

  if (!response.ok || "error" in data) {
    throw new Error(
      "error" in data ? data.error : "Could not create content item.",
    );
  }

  return data;
};

export const useContent = () => {
  const queryClient = useQueryClient();

  const contentQuery = useQuery({
    queryKey: contentQueryKey,
    queryFn: getContent,
  });

  const createContentMutation = useMutation({
    mutationFn: postContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
    },
  });

  return { contentQuery, createContentMutation };
};
