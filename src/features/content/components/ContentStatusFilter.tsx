"use client";

import { Select } from "@/components/Select";
import { ContentStatus } from "@/features/content/content";
import { useContentList } from "@/features/content/providers/ContentListProvider";

type StatusFilter = "All" | ContentStatus;

export const ContentStatusFilter = () => {
	const { statusFilter, setStatusFilter } = useContentList();

	return (
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
			onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
		/>
	);
};
