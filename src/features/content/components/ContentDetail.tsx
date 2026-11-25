"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import {
	type ContentItem,
	ContentStatus,
	ContentType,
} from "@/features/content/content";
import { contentAuthors } from "@/features/content/content-authors";
import { useContent } from "@/features/content/hooks/useContent";

type ContentDetailProps = {
	id: string;
};

type ContentDetailFormProps = {
	item: ContentItem;
};

const ContentDetailForm = ({ item }: ContentDetailFormProps) => {
	const router = useRouter();
	const { updateContentMutation, deleteContentMutation } = useContent();
	const [title, setTitle] = useState(item.title);
	const [status, setStatus] = useState<ContentStatus>(item.status);
	const [type, setType] = useState<ContentType>(item.type);
	const [deadline, setDeadline] = useState(item.deadline);
	const [authorIds, setAuthorIds] = useState(
		item.authors.map((author) => author.id),
	);

	const saveChanges = () => {
		updateContentMutation.mutate({
			id: item.id,
			content: { title, status, type, deadline, authors: authorIds },
		});
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

			<fieldset className="space-y-3 border-t border-border pt-5">
				<legend className="text-sm font-semibold text-text">Authors</legend>
				<div className="flex flex-wrap gap-x-6 gap-y-3">
					{contentAuthors.map((author) => (
						<label
							key={author.id}
							className="flex items-center gap-2 text-sm text-text"
						>
							<input
								className="size-4 accent-primary"
								type="checkbox"
								checked={authorIds.includes(author.id)}
								onChange={(event) => {
									setAuthorIds((current) =>
										event.target.checked
											? [...current, author.id]
											: current.filter((id) => id !== author.id),
									);
								}}
							/>
							{author.name}
						</label>
					))}
				</div>
			</fieldset>

			<div className="grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
				<p className="text-text/70">
					<span className="font-semibold text-text">Authors:</span>{" "}
					{item.authors.map((author) => author.name).join(", ")}
				</p>
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
					className="text-red-700 hover:text-red-900"
					variant="tertiary"
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

export const ContentDetail = ({ id }: ContentDetailProps) => {
	const { contentQuery } = useContent();

	if (contentQuery.isPending) {
		return <p className="py-10 text-center text-text/60">Loading content…</p>;
	}

	if (contentQuery.error) {
		return (
			<p className="py-10 text-sm text-red-700" role="alert">
				{contentQuery.error.message}
			</p>
		);
	}

	const item = contentQuery.data.find((contentItem) => contentItem.id === id);

	if (!item) {
		return <p className="py-10 text-text/60">Content item not found.</p>;
	}

	return <ContentDetailForm key={item.id} item={item} />;
};
