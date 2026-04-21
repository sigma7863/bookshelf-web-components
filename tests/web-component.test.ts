import { describe, expect, it, vi } from 'vitest';
import { BookshelfCarouselElement } from '../src/web-component';
import { sampleSections } from './fixtures';

describe('BookshelfCarouselElement', () => {
  it('renders separators and books from sections', () => {
    const element = new BookshelfCarouselElement();
    document.body.appendChild(element);

    element.sections = sampleSections;

    const root = element.shadowRoot;
    expect(root).toBeTruthy();
    expect(root?.querySelectorAll('[data-book-id]').length).toBe(3);
    expect(root?.querySelectorAll('.separator').length).toBe(2);

    element.remove();
  });

  it('opens modal and emits events when clicking a book', () => {
    const onBookClick = vi.fn();
    const onModalOpen = vi.fn();

    const element = new BookshelfCarouselElement();
    document.body.appendChild(element);
    element.sections = sampleSections;

    element.addEventListener('book-click', (event) => {
      onBookClick((event as CustomEvent).detail);
    });

    element.addEventListener('modal-open', (event) => {
      onModalOpen((event as CustomEvent).detail);
    });

    const firstBookButton = element.shadowRoot?.querySelector<HTMLButtonElement>('[data-book-id="book-1"]');
    firstBookButton?.click();

    expect(onBookClick).toHaveBeenCalledTimes(1);
    expect(onModalOpen).toHaveBeenCalledTimes(1);
    expect(element.shadowRoot?.querySelector('.modal-root.open')).toBeTruthy();

    element.remove();
  });

  it('resolves details asynchronously on open', async () => {
    const element = new BookshelfCarouselElement();
    document.body.appendChild(element);
    element.sections = sampleSections;
    element.bookDetailsResolver = async () => {
      return {
        description: 'Loaded from async resolver',
        meta: { Source: 'api' }
      };
    };

    const firstBookButton = element.shadowRoot?.querySelector<HTMLButtonElement>('[data-book-id="book-1"]');
    firstBookButton?.click();

    await Promise.resolve();
    await Promise.resolve();

    const modalText = element.shadowRoot?.querySelector('.modal-card')?.textContent ?? '';
    expect(modalText.includes('Loaded from async resolver')).toBe(true);
    expect(modalText.includes('Source')).toBe(true);

    element.remove();
  });
});
