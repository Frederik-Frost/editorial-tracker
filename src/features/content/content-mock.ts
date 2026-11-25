import { type ContentItem, ContentStatus, ContentType } from "./content";

export let contentItems: ContentItem[] = [
  {
    id: "content-1",
    title: "The changing face of local news",
    status: ContentStatus.Draft,
    authors: [{ id: "contributor-1", name: "Anders Andersen" }],
    createdBy: { id: "contributor-1", name: "Anders Andersen" },
    deadline: "2026-12-04",
    type: ContentType.Article,
  },
  {
    id: "content-2",
    title: "Inside the new energy debate",
    status: ContentStatus.Review,
    authors: [
      { id: "editor-1", name: "Anja Andersen" },
      { id: "contributor-1", name: "Anders Andersen" },
    ],
    createdBy: { id: "editor-1", name: "Anja Andersen" },
    deadline: "2026-12-08",
    type: ContentType.Video,
  },
  {
    id: "content-3",
    title: "A conversation about public trust",
    status: ContentStatus.Idea,
    authors: [{ id: "editor-1", name: "Anja Andersen" }],
    createdBy: { id: "editor-1", name: "Anja Andersen" },
    deadline: "2026-12-12",
    type: ContentType.Podcast,
  },
  {
    id: "content-4",
    title: "How communities are adapting",
    status: ContentStatus.Published,
    authors: [{ id: "contributor-1", name: "Anders Andersen" }],
    createdBy: { id: "contributor-1", name: "Anders Andersen" },
    deadline: "2026-11-18",
    type: ContentType.Article,
  },
];

export const addContentItem = (item: ContentItem) => {
  contentItems = [item, ...contentItems];
};

export const findContentItem = (id: string) =>
  contentItems.find((item) => item.id === id);

export const replaceContentItem = (updatedItem: ContentItem) => {
  contentItems = contentItems.map((item) =>
    item.id === updatedItem.id ? updatedItem : item,
  );
};

export const removeContentItem = (id: string) => {
  const existingCount = contentItems.length;
  contentItems = contentItems.filter((item) => item.id !== id);
  return contentItems.length < existingCount;
};
