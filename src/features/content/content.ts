export enum ContentStatus {
  Idea = "Idea",
  Draft = "Draft",
  Review = "Review",
  Published = "Published",
}

export enum ContentType {
  Article = "Article",
  Video = "Video",
  Podcast = "Podcast",
}

export type ContentAuthor = {
  id: string;
  name: string;
};

export type ContentItem = {
  id: string;
  title: string;
  status: ContentStatus;
  authors: ContentAuthor[];
  createdBy: ContentAuthor;
  deadline: string;
  type: ContentType;
};
