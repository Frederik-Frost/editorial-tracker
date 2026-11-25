import { ContentList } from "@/features/content/components/ContentList";

export const Dashboard = () => {
  return (
    <div className="px-5 py-8 sm:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text">Content</h2>
        <p className="mt-1 text-sm text-text/60">
          Track stories and production deadlines.
        </p>
      </div>
      <ContentList />
    </div>
  );
};
