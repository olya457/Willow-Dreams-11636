export type LibraryStackParams = {
  Library: undefined;
  ArticleDetail: { id: string };
  ProjectDetail: { id: string };
};
export type FinderStackParams = {
  Finder: undefined;
  ProjectDetail: { id: string };
};
export type GalleryStackParams = {
  Gallery: undefined;
  GalleryForm: { id?: string } | undefined;
};
export type TabParams = {
  Articles: undefined;
  Patterns: undefined;
  Projects: undefined;
  Finder: undefined;
  Tools: undefined;
  Gallery: undefined;
};
