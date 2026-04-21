import * as react from 'react';
import { HTMLAttributes, CSSProperties } from 'react';
import { S as ShelfSection, a as BookClickDetail, B as BookDetailsResolver } from './types-C_HcljBx.js';

type NativeAttrs = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onClick'>;
interface BookshelfCarouselProps extends NativeAttrs {
    sections: ShelfSection[];
    initialSectionId?: string;
    style?: CSSProperties;
    className?: string;
    onBookClick?: (detail: BookClickDetail) => void;
    onResolveBookDetails?: BookDetailsResolver;
    onModalOpen?: (detail: BookClickDetail) => void;
    onModalClose?: (detail?: BookClickDetail) => void;
}
interface BookshelfCarouselHandle extends HTMLElement {
    sections: ShelfSection[];
    initialSectionId?: string;
    bookDetailsResolver?: BookDetailsResolver;
}
declare const BookshelfCarousel: react.ForwardRefExoticComponent<BookshelfCarouselProps & react.RefAttributes<BookshelfCarouselHandle>>;

export { BookshelfCarousel, type BookshelfCarouselHandle, type BookshelfCarouselProps };
