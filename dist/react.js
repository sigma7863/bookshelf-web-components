import {
  defineBookshelfCarousel
} from "./chunk-LCPALEQS.js";

// src/react.tsx
import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from "react";
var BookshelfCarousel = forwardRef(
  ({
    sections,
    initialSectionId,
    onBookClick,
    onResolveBookDetails,
    onModalOpen,
    onModalClose,
    ...rest
  }, ref) => {
    defineBookshelfCarousel();
    const innerRef = useRef(null);
    useImperativeHandle(ref, () => innerRef.current, []);
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
      const bookHandler = (event) => {
        const custom = event;
        onBookClick?.(custom.detail);
      };
      const modalOpenHandler = (event) => {
        const custom = event;
        onModalOpen?.(custom.detail);
      };
      const modalCloseHandler = (event) => {
        const custom = event;
        onModalClose?.(custom.detail);
      };
      element.addEventListener("book-click", bookHandler);
      element.addEventListener("modal-open", modalOpenHandler);
      element.addEventListener("modal-close", modalCloseHandler);
      return () => {
        element.removeEventListener("book-click", bookHandler);
        element.removeEventListener("modal-open", modalOpenHandler);
        element.removeEventListener("modal-close", modalCloseHandler);
      };
    }, [onBookClick, onModalOpen, onModalClose]);
    return createElement("book-shelf-carousel", {
      ...rest,
      ref: innerRef
    });
  }
);
BookshelfCarousel.displayName = "BookshelfCarousel";
export {
  BookshelfCarousel
};
//# sourceMappingURL=react.js.map