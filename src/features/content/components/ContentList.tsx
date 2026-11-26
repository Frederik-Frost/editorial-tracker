"use client";

import { ContentResults } from "@/features/content/components/ContentResults";
import { ContentStatusFilter } from "@/features/content/components/ContentStatusFilter";
import { CreateContentForm } from "@/features/content/components/CreateContentForm";
import { ContentListProvider } from "@/features/content/providers/ContentListProvider";

export const ContentList = () => (
	<ContentListProvider>
		<div className="space-y-6">
			<CreateContentForm />

			<div className="flex flex-wrap items-center justify-between gap-3">
				<h3 className="text-lg font-bold text-text">Content items</h3>
				<ContentStatusFilter />
			</div>

			<ContentResults />
		</div>
	</ContentListProvider>
);
