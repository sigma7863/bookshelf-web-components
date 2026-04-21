import type {
  BookClickDetail,
  BookDetailsResolver,
  BookDetailsResolverResult,
  ShelfBook,
  ShelfSection
} from './types';

const ELEMENT_TAG = 'book-shelf-carousel';

const CSS_TEXT = `
:host {
  --bs-bg: #f7f3ec;
  --bs-text: #1f1f1f;
  --bs-muted: #585858;
  --bs-accent: #c6ad85;
  --bs-border: #ddd2c2;
  --bs-shelf-height: 560px;
  --bs-gap: 12px;
  --bs-radius: 6px;
  display: block;
  color: var(--bs-text);
  font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif;
}

* {
  box-sizing: border-box;
}

.bookshelf {
  background: radial-gradient(circle at 20% -20%, #ffffff 0%, var(--bs-bg) 52%, #efe6d8 100%);
  border: 1px solid var(--bs-border);
  border-radius: 14px;
  padding: 16px 8px 14px;
}

.track {
  align-items: end;
  cursor: grab;
  display: flex;
  gap: var(--bs-gap);
  min-height: var(--bs-shelf-height);
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  padding: 92px 10px 8px;
  scroll-snap-type: x mandatory;
  scrollbar-color: #b9ab94 transparent;
  scrollbar-width: thin;
}

.track.dragging {
  cursor: grabbing;
  user-select: none;
}

.track::-webkit-scrollbar {
  height: 10px;
}

.track::-webkit-scrollbar-thumb {
  background: #b9ab94;
  border-radius: 100px;
}

.item {
  align-items: end;
  display: flex;
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.separator {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 42px;
}

.separator img {
  border-radius: 2px;
  height: 320px;
  object-fit: cover;
  width: 20px;
}

.separator-fallback {
  background: linear-gradient(180deg, #e0c58f 0%, #d1b077 100%);
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(87, 52, 0, 0.18);
  height: 320px;
  width: 20px;
}

.separator-label {
  color: var(--bs-muted);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-align: center;
  writing-mode: vertical-rl;
}

.book-btn {
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.spine {
  border-radius: var(--bs-radius);
  display: block;
  object-fit: cover;
  transform: translateY(0);
  transition: transform 180ms ease;
  width: auto;
}

.book-btn:hover .spine,
.book-btn:focus-visible .spine {
  transform: translateY(-10px);
}

.spine-small {
  height: 392px;
}

.spine-medium {
  height: 482px;
}

.spine-large {
  height: 498px;
}

.spine-xlarge {
  height: 556px;
}

.book-btn:focus-visible {
  outline: 2px solid #885f1e;
  outline-offset: 3px;
  border-radius: var(--bs-radius);
}

.modal-root {
  inset: 0;
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}

.modal-root.open {
  pointer-events: auto;
}

.modal-backdrop {
  background: rgba(17, 11, 2, 0.45);
  inset: 0;
  opacity: 0;
  position: absolute;
  transition: opacity 160ms ease;
}

.modal-root.open .modal-backdrop {
  opacity: 1;
}

.modal-card {
  background: #fffdf8;
  border-radius: 12px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
  inset: 50% auto auto 50%;
  max-height: min(90vh, 720px);
  max-width: min(96vw, 860px);
  opacity: 0;
  overflow: auto;
  padding: 20px;
  position: absolute;
  transform: translate(-50%, -48%);
  transition: opacity 160ms ease, transform 160ms ease;
  width: 860px;
}

.modal-root.open .modal-card {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.modal-close {
  background: transparent;
  border: 0;
  color: var(--bs-muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  margin-left: auto;
  padding: 4px;
}

.modal-content {
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 240px) minmax(0, 1fr);
}

.modal-cover {
  background: #f3ebde;
  border-radius: 8px;
  min-height: 320px;
  object-fit: cover;
  width: 100%;
}

.meta-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}

.meta-author {
  color: var(--bs-muted);
  font-size: 15px;
  margin-top: 8px;
}

.meta-description {
  line-height: 1.7;
  margin-top: 12px;
  white-space: pre-wrap;
}

.modal-loading {
  color: #7a6b52;
  font-size: 13px;
  margin-top: 10px;
}

.modal-error {
  color: #b53a2f;
  font-size: 13px;
  margin-top: 10px;
}

.meta-list {
  border-top: 1px solid #e9e1d4;
  display: grid;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
}

.meta-line {
  display: flex;
  font-size: 13px;
  gap: 10px;
}

.meta-key {
  color: #6b5b43;
  min-width: 96px;
}

.purchase-link {
  background: #70582f;
  border-radius: 8px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
  margin-top: 16px;
  padding: 10px 14px;
  text-decoration: none;
}

@media (max-width: 768px) {
  .bookshelf {
    padding: 14px 4px 12px;
  }

  .track {
    min-height: 450px;
    padding-top: 52px;
  }

  .spine-small { height: 315px; }
  .spine-medium { height: 388px; }
  .spine-large { height: 400px; }
  .spine-xlarge { height: 448px; }

  .modal-card {
    padding: 14px;
    width: min(96vw, 560px);
  }

  .modal-content {
    grid-template-columns: 1fr;
  }

  .modal-cover {
    max-height: 320px;
  }

  .meta-title {
    font-size: 20px;
  }
}
`;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isBook(value: unknown): value is ShelfBook {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<ShelfBook>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.spineImage === 'string' &&
    typeof candidate.spineSize === 'string'
  );
}

function isSection(value: unknown): value is ShelfSection {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<ShelfSection>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.label === 'string' &&
    Array.isArray(candidate.books) &&
    candidate.books.every((book) => isBook(book))
  );
}

interface DragState {
  isPointerDown: boolean;
  startX: number;
  startLeft: number;
}

export class BookshelfCarouselElement extends HTMLElement {
  static readonly tagName = ELEMENT_TAG;

  #sections: ShelfSection[] = [];
  #initialSectionId?: string;
  #bookDetailsResolver?: BookDetailsResolver;
  #activeBook?: ShelfBook;
  #activeSectionId?: string;
  #isModalLoading = false;
  #modalError = '';
  #resolverToken = 0;
  #bookIndex = new Map<string, BookClickDetail>();
  #track: HTMLElement | null = null;
  #dragState: DragState = { isPointerDown: false, startX: 0, startLeft: 0 };
  #scrolledToInitial = false;
  #rootClickHandler: EventListener;
  #keyDownHandler: EventListener;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.#rootClickHandler = (event) => this.#onRootClick(event);
    this.#keyDownHandler = (event) => this.#onKeyDown(event as KeyboardEvent);
  }

  get sections(): ShelfSection[] {
    return this.#sections;
  }

  set sections(value: ShelfSection[]) {
    const safeValue = Array.isArray(value) ? value.filter((section) => isSection(section)) : [];
    this.#sections = safeValue;
    this.#bookIndex.clear();
    this.#scrolledToInitial = false;
    this.#render();
  }

  get initialSectionId(): string | undefined {
    return this.#initialSectionId;
  }

  set initialSectionId(value: string | undefined) {
    this.#initialSectionId = typeof value === 'string' && value.length > 0 ? value : undefined;
    this.#scrolledToInitial = false;
    this.#render();
  }

  get bookDetailsResolver(): BookDetailsResolver | undefined {
    return this.#bookDetailsResolver;
  }

  set bookDetailsResolver(value: BookDetailsResolver | undefined) {
    this.#bookDetailsResolver = typeof value === 'function' ? value : undefined;
  }

  connectedCallback(): void {
    this.#render();
    this.shadowRoot?.addEventListener('click', this.#rootClickHandler);
    this.shadowRoot?.addEventListener('keydown', this.#keyDownHandler);
  }

  disconnectedCallback(): void {
    this.shadowRoot?.removeEventListener('click', this.#rootClickHandler);
    this.shadowRoot?.removeEventListener('keydown', this.#keyDownHandler);
  }

  #onRootClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.closest('[data-modal-close]')) {
      this.#closeModal();
      return;
    }

    const bookButton = target.closest<HTMLButtonElement>('[data-book-id]');
    if (!bookButton) {
      return;
    }

    const bookId = bookButton.dataset.bookId;
    if (!bookId) {
      return;
    }

    const detail = this.#bookIndex.get(bookId);
    if (!detail) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent<BookClickDetail>('book-click', {
        detail,
        bubbles: true,
        composed: true
      })
    );
    void this.#handleBookOpen(detail);
  }

  #onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.#activeBook) {
      event.preventDefault();
      this.#closeModal();
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const target = event.target as HTMLElement;
      if (!target.closest('.track')) {
        return;
      }

      event.preventDefault();
      const diff = event.key === 'ArrowRight' ? 220 : -220;
      this.#track?.scrollBy({ left: diff, behavior: 'smooth' });
      return;
    }

    if (event.key === 'Tab' && this.#activeBook) {
      this.#trapModalFocus(event);
    }
  }

  #trapModalFocus(event: KeyboardEvent): void {
    const modal = this.shadowRoot?.querySelector<HTMLElement>('.modal-card');
    if (!modal) {
      return;
    }

    const selectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const focusables = Array.from(modal.querySelectorAll<HTMLElement>(selectors));
    if (focusables.length === 0) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.shadowRoot?.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async #handleBookOpen(detail: BookClickDetail): Promise<void> {
    this.#openModal(detail.book, detail.sectionId);
    const resolver = this.#bookDetailsResolver;
    if (!resolver) {
      return;
    }

    const token = ++this.#resolverToken;
    this.#isModalLoading = true;
    this.#modalError = '';
    this.#render();

    try {
      const result = await resolver(detail);
      if (token !== this.#resolverToken || !this.#activeBook) {
        return;
      }

      this.#applyResolvedBookDetails(result);
      this.#isModalLoading = false;
      this.#modalError = '';
      this.#render();
    } catch {
      if (token !== this.#resolverToken) {
        return;
      }

      this.#isModalLoading = false;
      this.#modalError = 'Failed to load additional book details.';
      this.#render();
    }
  }

  #applyResolvedBookDetails(result: BookDetailsResolverResult): void {
    if (!result || !this.#activeBook) {
      return;
    }

    this.#activeBook = {
      ...this.#activeBook,
      ...result,
      id: this.#activeBook.id,
      title: result.title ?? this.#activeBook.title,
      spineImage: result.spineImage ?? this.#activeBook.spineImage,
      spineSize: result.spineSize ?? this.#activeBook.spineSize
    };
  }

  #openModal(book: ShelfBook, sectionId: string): void {
    this.#activeBook = book;
    this.#activeSectionId = sectionId;
    this.#isModalLoading = false;
    this.#modalError = '';
    this.#render();
    this.dispatchEvent(
      new CustomEvent<BookClickDetail>('modal-open', {
        detail: { book, sectionId },
        bubbles: true,
        composed: true
      })
    );

    const closeButton = this.shadowRoot?.querySelector<HTMLElement>('.modal-close');
    closeButton?.focus();
  }

  #closeModal(): void {
    const detail = this.#activeBook && this.#activeSectionId
      ? { book: this.#activeBook, sectionId: this.#activeSectionId }
      : undefined;

    this.#resolverToken += 1;
    this.#activeBook = undefined;
    this.#activeSectionId = undefined;
    this.#isModalLoading = false;
    this.#modalError = '';
    this.#render();

    this.dispatchEvent(
      new CustomEvent<BookClickDetail | undefined>('modal-close', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  #attachDragToScroll(track: HTMLElement): void {
    const state = this.#dragState;

    track.addEventListener('pointerdown', (event) => {
      state.isPointerDown = true;
      state.startX = event.clientX;
      state.startLeft = track.scrollLeft;
      track.classList.add('dragging');
      track.setPointerCapture(event.pointerId);
    });

    track.addEventListener('pointermove', (event) => {
      if (!state.isPointerDown) {
        return;
      }

      const delta = event.clientX - state.startX;
      track.scrollLeft = state.startLeft - delta;
    });

    const finish = () => {
      state.isPointerDown = false;
      track.classList.remove('dragging');
    };

    track.addEventListener('pointerup', finish);
    track.addEventListener('pointercancel', finish);
    track.addEventListener('pointerleave', finish);
  }

  #render(): void {
    if (!this.shadowRoot) {
      return;
    }

    const previousScroll = this.#track?.scrollLeft ?? 0;
    this.#bookIndex.clear();

    const itemsMarkup = this.#sections
      .map((section) => {
        const separator = `
          <div class="item" data-section-id="${escapeHtml(section.id)}">
            <div class="separator" aria-label="${escapeHtml(section.label)}">
              ${section.separatorImage
                ? `<img src="${escapeHtml(section.separatorImage)}" alt="${escapeHtml(section.label)}">`
                : '<div class="separator-fallback" aria-hidden="true"></div>'}
              <div class="separator-label">${escapeHtml(section.label)}</div>
            </div>
          </div>
        `;

        const books = section.books
          .map((book) => {
            this.#bookIndex.set(book.id, { book, sectionId: section.id });
            return `
              <div class="item" data-section-id="${escapeHtml(section.id)}">
                <button class="book-btn" data-book-id="${escapeHtml(book.id)}" aria-label="${escapeHtml(book.title)}">
                  <img class="spine spine-${escapeHtml(book.spineSize)}" src="${escapeHtml(book.spineImage)}" alt="${escapeHtml(book.title)}" loading="lazy" decoding="async">
                </button>
              </div>
            `;
          })
          .join('');

        return `${separator}${books}`;
      })
      .join('');

    const activeBook = this.#activeBook;
    const activeMeta = activeBook?.meta
      ? Object.entries(activeBook.meta)
          .map(([key, value]) => `
            <div class="meta-line">
              <div class="meta-key">${escapeHtml(key)}</div>
              <div>${escapeHtml(value)}</div>
            </div>
          `)
          .join('')
      : '';

    const modalMarkup = activeBook
      ? `
          <div class="modal-root open" role="presentation">
            <div class="modal-backdrop" data-modal-close="true"></div>
            <section class="modal-card" role="dialog" aria-modal="true" aria-label="Book details">
              <button class="modal-close" data-modal-close="true" aria-label="Close">Close</button>
              <div class="modal-content">
                <img class="modal-cover" src="${escapeHtml(activeBook.coverImage ?? activeBook.spineImage)}" alt="${escapeHtml(activeBook.title)}">
                <div>
                  <div class="meta-title">${escapeHtml(activeBook.title)}</div>
                  ${activeBook.author ? `<div class="meta-author">${escapeHtml(activeBook.author)}</div>` : ''}
                  ${this.#isModalLoading ? '<div class="modal-loading">Loading details...</div>' : ''}
                  ${this.#modalError ? `<div class="modal-error">${escapeHtml(this.#modalError)}</div>` : ''}
                  ${activeBook.description ? `<div class="meta-description">${escapeHtml(activeBook.description)}</div>` : ''}
                  ${activeMeta ? `<div class="meta-list">${activeMeta}</div>` : ''}
                  ${activeBook.purchaseUrl
                    ? `<a class="purchase-link" href="${escapeHtml(activeBook.purchaseUrl)}" target="_blank" rel="noreferrer noopener">Purchase</a>`
                    : ''}
                </div>
              </div>
            </section>
          </div>
        `
      : '<div class="modal-root" role="presentation"></div>';

    this.shadowRoot.innerHTML = `
      <style>${CSS_TEXT}</style>
      <section class="bookshelf">
        <div class="track" tabindex="0" aria-label="Bookshelf carousel">${itemsMarkup}</div>
      </section>
      ${modalMarkup}
    `;

    const track = this.shadowRoot.querySelector<HTMLElement>('.track');
    if (!track) {
      return;
    }

    this.#track = track;
    this.#attachDragToScroll(track);
    track.scrollLeft = previousScroll;

    if (this.#initialSectionId && !this.#scrolledToInitial) {
      const firstItem = track.querySelector<HTMLElement>(`[data-section-id="${this.#initialSectionId}"]`);
      if (firstItem) {
        firstItem.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
      }
      this.#scrolledToInitial = true;
    }
  }
}

export function defineBookshelfCarousel(tagName = ELEMENT_TAG): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, BookshelfCarouselElement);
  }
}

defineBookshelfCarousel();
