import Link from "next/link";
import type { ContentItem } from "@/features/content/content";

type ContentResultsProps = {
  items: ContentItem[];
  filteredItems: ContentItem[];
  isPending: boolean;
  error: Error | null;
};

export const ContentResults = ({
  items,
  filteredItems,
  isPending,
  error,
}: ContentResultsProps) => {
  if (isPending) {
    return (
      <p className="px-6 py-10 text-center text-text/60">Loading content…</p>
    );
  }

  if (error) {
    return (
      <p className="px-6 py-10 text-center text-sm text-red-700" role="alert">
        {error.message}
      </p>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <p className="px-6 py-10 text-center text-text/60">
        {items.length === 0
          ? "No content items yet. Add one above."
          : "No content items match this status."}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-160 border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-text/60">
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created by</th>
            <th className="px-6 py-4 font-semibold">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-0">
              <td className="px-6 py-4">
                <Link
                  href={`/content/${item.id}`}
                  className="font-semibold text-text hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs text-text/60">
                  Authors:{" "}
                  {item.authors.map((author) => author.name).join(", ")}
                </p>
              </td>
              <td className="px-6 py-4 text-text/70">{item.type}</td>
              <td className="px-6 py-4">
                <span className="inline-flex rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-text">
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-text/70">{item.createdBy.name}</td>
              <td className="px-6 py-4 text-text/70">{item.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
