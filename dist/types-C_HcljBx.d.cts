type SpineSize = 'small' | 'medium' | 'large' | 'xlarge';
interface ShelfBook {
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
interface ShelfSection {
    id: string;
    label: string;
    separatorImage?: string;
    books: ShelfBook[];
}
interface BookClickDetail {
    book: ShelfBook;
    sectionId: string;
}
type BookDetailsResolverResult = Partial<ShelfBook> | void | undefined;
type BookDetailsResolver = (detail: BookClickDetail) => Promise<BookDetailsResolverResult> | BookDetailsResolverResult;

export type { BookDetailsResolver as B, ShelfSection as S, BookClickDetail as a, BookDetailsResolverResult as b, ShelfBook as c, SpineSize as d };
