import { S as ShelfSection, B as BookDetailsResolver } from './types-C_HcljBx.cjs';
export { a as BookClickDetail, b as BookDetailsResolverResult, c as ShelfBook, d as SpineSize } from './types-C_HcljBx.cjs';

declare class BookshelfCarouselElement extends HTMLElement {
    #private;
    static readonly tagName = "book-shelf-carousel";
    constructor();
    get sections(): ShelfSection[];
    set sections(value: ShelfSection[]);
    get initialSectionId(): string | undefined;
    set initialSectionId(value: string | undefined);
    get bookDetailsResolver(): BookDetailsResolver | undefined;
    set bookDetailsResolver(value: BookDetailsResolver | undefined);
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare function defineBookshelfCarousel(tagName?: string): void;

export { BookDetailsResolver, BookshelfCarouselElement, ShelfSection, defineBookshelfCarousel };
