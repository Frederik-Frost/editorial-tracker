import type { ContentAuthor } from "@/features/content/content";

type AuthorLabelsProps = {
  authors: ContentAuthor[];
  canRemove: boolean;
  onRemove: (authorId: string) => void;
};

export const AuthorLabels = ({
  authors,
  canRemove,
  onRemove,
}: AuthorLabelsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {authors.map((author) => (
        <span
          key={author.id}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-text"
        >
          {author.name}
          <button
            className="font-bold text-text/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            aria-label={`Remove ${author.name}`}
            disabled={!canRemove}
            onClick={() => onRemove(author.id)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};
