"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContentItem,
  ContentStatus,
  ContentType,
} from "@/features/content/content";

type GetContentResponse = ContentItem[] | { error: string };
type CreateContentResponse = ContentItem | { error: string };
type CreateContentInput = {
  title: string;
  type: ContentType;
  deadline: string;
};
type UpdateContentInput = {
  id: string;
  content: {
    title: string;
    status: ContentStatus;
    deadline: string;
    type: ContentType;
    authors: string[];
  };
};
type UpdateContentResponse = ContentItem | { error: string };

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

const putContent = async ({ id, content }: UpdateContentInput) => {
  const response = await fetch(`/api/content/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
  const data = (await response.json()) as UpdateContentResponse;

  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "Could not update content.");
  }

  return data;
};

const deleteContent = async (id: string): Promise<void> => {
  const response = await fetch(`/api/content/${id}`, { method: "DELETE" });

  if (!response.ok) {
    const data = (await response.json()) as { error?: string };
    throw new Error(data.error ?? "Could not delete content.");
  }
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

  const updateContentMutation = useMutation({
    mutationFn: putContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: contentQueryKey });
    },
  });

  return {
    contentQuery,
    createContentMutation,
    updateContentMutation,
    deleteContentMutation,
  };
};
