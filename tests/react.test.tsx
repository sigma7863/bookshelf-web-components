import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BookshelfCarousel } from '../src/react';
import { sampleSections } from './fixtures';

describe('BookshelfCarousel react wrapper', () => {
  it('forwards events from custom element callbacks', () => {
    const onBookClick = vi.fn();

    const { container } = render(
      <BookshelfCarousel sections={sampleSections} onBookClick={onBookClick} />
    );

    const element = container.querySelector('book-shelf-carousel') as HTMLElement;
    expect(element).toBeTruthy();

    const firstBookButton = (element.shadowRoot as ShadowRoot).querySelector<HTMLButtonElement>(
      '[data-book-id="book-1"]'
    );

    firstBookButton?.click();

    expect(onBookClick).toHaveBeenCalledTimes(1);
    expect(onBookClick.mock.calls[0][0].book.id).toBe('book-1');
  });

  it('forwards resolver prop to custom element', async () => {
    const onResolveBookDetails = vi.fn(async () => ({
      description: 'Resolved in wrapper'
    }));

    const { container } = render(
      <BookshelfCarousel sections={sampleSections} onResolveBookDetails={onResolveBookDetails} />
    );

    const element = container.querySelector('book-shelf-carousel') as HTMLElement;
    const firstBookButton = (element.shadowRoot as ShadowRoot).querySelector<HTMLButtonElement>(
      '[data-book-id="book-1"]'
    );

    firstBookButton?.click();

    await waitFor(() => {
      expect(onResolveBookDetails).toHaveBeenCalledTimes(1);
    });
  });
});
