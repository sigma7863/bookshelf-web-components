# bookshelf-ui

Reusable bookshelf carousel inspired by chikumashobo's shelf layout.

## Distribution

This package is currently intended for GitHub distribution only (not published on npm).

```bash
npm i github:sigma7863/bookshelf-web-components
```

## Usage (Web Components)

```ts
import { defineBookshelfCarousel } from 'bookshelf-ui';

defineBookshelfCarousel();

const element = document.querySelector('book-shelf-carousel');
element.sections = [
  {
    id: '202604',
    label: 'Apr 2026',
    books: [
      {
        id: 'book-1',
        title: 'Unknown as Method',
        spineImage: '/spines/book-1.png',
        spineSize: 'small'
      }
    ]
  }
];

element.bookDetailsResolver = async ({ book }) => {
  const response = await fetch(`/api/books/${book.id}`);
  const details = await response.json();
  return {
    description: details.description,
    author: details.author,
    meta: details.meta
  };
};
```

```html
<book-shelf-carousel></book-shelf-carousel>
```

## Usage (React)

```tsx
import { BookshelfCarousel } from 'bookshelf-ui/react';

export function Page() {
  return (
    <BookshelfCarousel
      sections={sections}
      onResolveBookDetails={async ({ book }) => {
        const response = await fetch(`/api/books/${book.id}`);
        return response.json();
      }}
      onBookClick={({ book }) => console.log(book.id)}
    />
  );
}
```

## Types

- `ShelfSection`: monthly (or category) group with `id`, `label`, `separatorImage?`, `books`
- `ShelfBook`: `id`, `title`, `spineImage`, `spineSize`, optional detail fields for modal
- `spineSize`: `'small' | 'medium' | 'large' | 'xlarge'`

## Events

Web Component emits:

- `book-click` with `{ book, sectionId }`
- `modal-open` with `{ book, sectionId }`
- `modal-close` with `{ book, sectionId } | undefined`

## Dev

```bash
npm run typecheck
npm test
npm run build
```
