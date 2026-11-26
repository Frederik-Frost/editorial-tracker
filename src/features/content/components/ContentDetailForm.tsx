"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useUser } from "@/features/auth/components/UserProvider";
import { AuthorLabels } from "@/features/content/components/AuthorLabels";
import {
	type ContentItem,
	ContentStatus,
	ContentType,
} from "@/features/content/content";
import { contentAuthors } from "@/features/content/content-authors";
import { useContent } from "@/features/content/hooks/useContent";

type ContentDetailFormProps = {
	item: ContentItem;
};

export const ContentDetailForm = ({ item }: ContentDetailFormProps) => {
	const router = useRouter();
	const user = useUser();
	const { updateContentMutation, deleteContentMutation } = useContent();
	const [title, setTitle] = useState(item.title);
	const [status, setStatus] = useState<ContentStatus>(item.status);
	const [type, setType] = useState<ContentType>(item.type);
	const [deadline, setDeadline] = useState(item.deadline);
	const [authorIds, setAuthorIds] = useState(
		item.authors.map((author) => author.id),
	);
	const [authorToAdd, setAuthorToAdd] = useState("");
	const selectedAuthors = contentAuthors.filter((author) =>
		authorIds.includes(author.id),
	);
	const availableAuthors = contentAuthors.filter(
		(author) => !authorIds.includes(author.id),
	);

	const saveChanges = () => {
		updateContentMutation.mutate(
			{
				id: item.id,
				content: { title, status, type, deadline, authors: authorIds },
			},
			{
				onSuccess: (updatedItem) => {
					// Redirect contributors after they remove their own access to this item.
					if (
						user.role === "Contributor" &&
						!updatedItem.authors.some((author) => author.id === user.id)
					) {
						router.replace("/");
					}
				},
			},
		);
	};

	const deleteItem = () => {
		if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) {
			return;
		}

		deleteContentMutation.mutate(item.id, {
			onSuccess: () => router.replace("/"),
		});
	};

	return (
		<form
			className="space-y-6"
			onSubmit={(event) => {
				event.preventDefault();
				saveChanges();
			}}
		>
			<div className="grid gap-5 sm:grid-cols-2">
				<Input
					label="Title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					required
					maxLength={160}
				/>
				<Select
					label="Type"
					options={Object.values(ContentType).map((value) => ({
						label: value,
						value,
					}))}
					value={type}
					onChange={(event) => setType(event.target.value as ContentType)}
				/>
				<Select
					label="Status"
					options={Object.values(ContentStatus).map((value) => ({
						label: value,
						value,
					}))}
					value={status}
					onChange={(event) => setStatus(event.target.value as ContentStatus)}
				/>
				<Input
					label="Deadline"
					type="date"
					value={deadline}
					onChange={(event) => setDeadline(event.target.value)}
					required
				/>
			</div>

			<div className="space-y-3 border-t border-border pt-5">
				<p className="text-sm font-semibold text-text">Authors</p>
				<div className="max-w-sm">
					<Select
						label="Add an author"
						options={[
							{ label: "Choose an author…", value: "" },
							...availableAuthors.map((author) => ({
								label: author.name,
								value: author.id,
							})),
						]}
						value={authorToAdd}
						onChange={(event) => {
							const authorId = event.target.value;
							if (authorId) {
								setAuthorIds((current) => [...current, authorId]);
								setAuthorToAdd("");
							}
						}}
					/>
				</div>
				<AuthorLabels
					authors={selectedAuthors}
					canRemove={authorIds.length > 1}
					onRemove={(authorId) =>
						setAuthorIds((current) => current.filter((id) => id !== authorId))
					}
				/>
			</div>

			<div className="grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
				<p className="text-text/70">
					<span className="font-semibold text-text">Created by:</span>{" "}
					{item.createdBy.name}
				</p>
			</div>

			{(updateContentMutation.error || deleteContentMutation.error) && (
				<p className="text-sm text-red-700" role="alert">
					{updateContentMutation.error?.message ??
						deleteContentMutation.error?.message}
				</p>
			)}

			<div className="flex flex-wrap justify-between gap-3 border-t border-border pt-5">
				<Button
					variant="destructive"
					type="button"
					disabled={deleteContentMutation.isPending}
					onClick={deleteItem}
				>
					{deleteContentMutation.isPending ? "Deleting…" : "Delete content"}
				</Button>
				<Button type="submit" disabled={updateContentMutation.isPending}>
					{updateContentMutation.isPending ? "Saving…" : "Save changes"}
				</Button>
			</div>
		</form>
	);
};
