import type { ShelfSection } from '../src/types';

export const sampleSections: ShelfSection[] = [
  {
    id: '202604',
    label: 'Apr 2026',
    books: [
      {
        id: 'book-1',
        title: 'Unknown as Method',
        spineImage: 'https://example.com/spine-1.png',
        coverImage: 'https://example.com/cover-1.png',
        author: 'Author A',
        description: 'Description A',
        spineSize: 'small',
        purchaseUrl: 'https://example.com/purchase/1',
        meta: {
          ISBN: '978-4-00-000000-1',
          Category: 'Essay'
        }
      },
      {
        id: 'book-2',
        title: 'Stacked Reading',
        spineImage: 'https://example.com/spine-2.png',
        spineSize: 'medium'
      }
    ]
  },
  {
    id: '202603',
    label: 'Mar 2026',
    books: [
      {
        id: 'book-3',
        title: 'Book Three',
        spineImage: 'https://example.com/spine-3.png',
        spineSize: 'large'
      }
    ]
  }
];
