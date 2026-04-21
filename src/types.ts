export type SpineSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ShelfBook {
  id: string;
  title: string;
  spineImage: string;
  spineSize: SpineSize;
  coverImage?: string;
  author?: string;
  description?: string;
  purchaseUrl?: string;
  meta?: Record<string, string>;
}

export interface ShelfSection {
  id: string;
  label: string;
  separatorImage?: string;
  books: ShelfBook[];
}

export interface BookClickDetail {
  book: ShelfBook;
  sectionId: string;
}

export type BookDetailsResolverResult = Partial<ShelfBook> | void | undefined;

export type BookDetailsResolver = (
  detail: BookClickDetail
) => Promise<BookDetailsResolverResult> | BookDetailsResolverResult;
