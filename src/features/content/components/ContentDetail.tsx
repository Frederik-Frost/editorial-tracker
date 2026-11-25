"use client";

import { ContentDetailForm } from "@/features/content/components/ContentDetailForm";
import { useContent } from "@/features/content/hooks/useContent";

type ContentDetailProps = {
	id: string;
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
