"use client";

import { useState } from "react";
import { Select } from "@/components/Select";
import { ContentResults } from "@/features/content/components/ContentResults";
import { CreateContentForm } from "@/features/content/components/CreateContentForm";
import { ContentStatus } from "@/features/content/content";
import { useContent } from "@/features/content/hooks/useContent";

type StatusFilter = "All" | ContentStatus;

export const ContentList = () => {
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
	const { contentQuery } = useContent();
	const items = contentQuery.data ?? [];

	const filteredItems =
		statusFilter === "All"
			? items
			: items.filter((item) => item.status === statusFilter);

	return (
		<div className="space-y-6">
			<CreateContentForm />

			<div className="flex flex-wrap items-center justify-between gap-3">
				<h3 className="text-lg font-bold text-text">Content items</h3>
				<Select
					label="Status"
					compact
					labelClassName="flex-row items-center gap-3"
					options={[
						{ label: "All statuses", value: "All" },
						...Object.values(ContentStatus).map((status) => ({
							label: status,
							value: status,
						})),
					]}
					value={statusFilter}
					onChange={(event) =>
						setStatusFilter(event.target.value as StatusFilter)
					}
				/>
			</div>

			<ContentResults
				items={items}
				filteredItems={filteredItems}
				isPending={contentQuery.isPending}
				error={contentQuery.error}
			/>
		</div>
	);
};
