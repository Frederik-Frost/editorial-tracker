"use client";

import { type SubmitEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { ContentType } from "@/features/content/content";
import { useContent } from "@/features/content/hooks/useContent";

export const CreateContentForm = () => {
  const { createContentMutation } = useContent();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContentType>(ContentType.Article);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    createContentMutation.mutate(
      { title, type, deadline },
      {
        onSuccess: () => {
          setTitle("");
          setType(ContentType.Article);
          setDeadline("");
        },
      },
    );
  };

  return (
    <form
      className="grid gap-4 border-b border-border pb-6 sm:grid-cols-2 lg:grid-cols-[minmax(12rem,2fr)_1fr_1fr_auto] lg:items-end"
      onSubmit={handleSubmit}
    >
      <Input
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        maxLength={160}
        placeholder="Content title"
      />

      <Select
        label="Type"
        options={Object.values(ContentType).map((contentType) => ({
          label: contentType,
          value: contentType,
        }))}
        value={type}
        onChange={(event) => setType(event.target.value as ContentType)}
      />

      <Input
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
        required
      />

      <Button
        className="h-12"
        type="submit"
        disabled={createContentMutation.isPending}
      >
        {createContentMutation.isPending ? "Adding…" : "Add content"}
      </Button>

      {createContentMutation.error && (
        <p
          className="text-sm text-red-700 sm:col-span-2 lg:col-span-4"
          role="alert"
        >
          {createContentMutation.error.message}
        </p>
      )}
    </form>
  );
};
