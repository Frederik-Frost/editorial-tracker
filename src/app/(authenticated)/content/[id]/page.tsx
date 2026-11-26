import Link from "next/link";
import { ContentDetail } from "@/features/content/components/ContentDetail";

type ContentDetailPageProps = {
	params: Promise<{ id: string }>;
};

const ContentDetailPage = async ({ params }: ContentDetailPageProps) => {
	const { id } = await params;

	return (
		<section className="px-5 py-8 sm:px-8">
			<Link
				className="mb-5 inline-block text-sm font-semibold text-text/70 hover:text-primary"
				href="/"
			>
				← Back to content
			</Link>
			<h2 className="mb-6 text-2xl font-bold text-text">Content details</h2>
			<ContentDetail id={id} />
		</section>
	);
};

export default ContentDetailPage;
