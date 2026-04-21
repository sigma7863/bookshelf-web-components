import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type HTMLAttributes
} from 'react';
import type {
  BookClickDetail,
  BookDetailsResolver,
  ShelfSection
} from './types';
import { defineBookshelfCarousel } from './web-component';

type NativeAttrs = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onClick'>;

export interface BookshelfCarouselProps extends NativeAttrs {
  sections: ShelfSection[];
  initialSectionId?: string;
  style?: CSSProperties;
  className?: string;
  onBookClick?: (detail: BookClickDetail) => void;
  onResolveBookDetails?: BookDetailsResolver;
  onModalOpen?: (detail: BookClickDetail) => void;
  onModalClose?: (detail?: BookClickDetail) => void;
}

export interface BookshelfCarouselHandle extends HTMLElement {
  sections: ShelfSection[];
  initialSectionId?: string;
  bookDetailsResolver?: BookDetailsResolver;
}

export const BookshelfCarousel = forwardRef<BookshelfCarouselHandle, BookshelfCarouselProps>(
  (
    {
      sections,
      initialSectionId,
      onBookClick,
      onResolveBookDetails,
      onModalOpen,
      onModalClose,
      ...rest
    },
    ref
  ) => {
    defineBookshelfCarousel();

    const innerRef = useRef<BookshelfCarouselHandle | null>(null);

    useImperativeHandle(ref, () => innerRef.current as BookshelfCarouselHandle, []);

    useEffect(() => {
      const element = innerRef.current;
      if (!element) {
        return;
      }

      element.sections = sections;
      element.initialSectionId = initialSectionId;
      element.bookDetailsResolver = onResolveBookDetails;
    }, [sections, initialSectionId, onResolveBookDetails]);

    useEffect(() => {
      const element = innerRef.current;
      if (!element) {
        return;
      }

      const bookHandler = (event: Event) => {
        const custom = event as CustomEvent<BookClickDetail>;
        onBookClick?.(custom.detail);
      };

      const modalOpenHandler = (event: Event) => {
        const custom = event as CustomEvent<BookClickDetail>;
        onModalOpen?.(custom.detail);
      };

      const modalCloseHandler = (event: Event) => {
        const custom = event as CustomEvent<BookClickDetail | undefined>;
        onModalClose?.(custom.detail);
      };

      element.addEventListener('book-click', bookHandler);
      element.addEventListener('modal-open', modalOpenHandler);
      element.addEventListener('modal-close', modalCloseHandler);

      return () => {
        element.removeEventListener('book-click', bookHandler);
        element.removeEventListener('modal-open', modalOpenHandler);
        element.removeEventListener('modal-close', modalCloseHandler);
      };
    }, [onBookClick, onModalOpen, onModalClose]);

    return createElement('book-shelf-carousel', {
      ...(rest as HTMLAttributes<HTMLElement>),
      ref: innerRef
    });
  }
);

BookshelfCarousel.displayName = 'BookshelfCarousel';
