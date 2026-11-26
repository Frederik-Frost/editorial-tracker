"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import type { ContentItem, ContentStatus } from "@/features/content/content";
import { useContent } from "@/features/content/hooks/useContent";

type StatusFilter = "All" | ContentStatus;

type ContentListContextValue = {
	items: ContentItem[];
	filteredItems: ContentItem[];
	statusFilter: StatusFilter;
	setStatusFilter: (status: StatusFilter) => void;
	isPending: boolean;
	error: Error | null;
};

const ContentListContext = createContext<ContentListContextValue | null>(null);

type ContentListProviderProps = {
	children: ReactNode;
};

export const ContentListProvider = ({ children }: ContentListProviderProps) => {
	const { contentQuery } = useContent();
	const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
	const items = contentQuery.data ?? [];
	const filteredItems = useMemo(
		() =>
			statusFilter === "All"
				? items
				: items.filter((item) => item.status === statusFilter),
		[items, statusFilter],
	);

	const value = useMemo<ContentListContextValue>(
		() => ({
			items,
			filteredItems,
			statusFilter,
			setStatusFilter,
			isPending: contentQuery.isPending,
			error: contentQuery.error,
		}),
		[
			items,
			filteredItems,
			statusFilter,
			contentQuery.isPending,
			contentQuery.error,
		],
	);

	return (
		<ContentListContext.Provider value={value}>
			{children}
		</ContentListContext.Provider>
	);
};

export const useContentList = () => {
	const context = useContext(ContentListContext);

	if (!context) {
		throw new Error(
			"useContentList must be used within a ContentListProvider.",
		);
	}

	return context;
};
