"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BookshelfCarouselElement: () => BookshelfCarouselElement,
  defineBookshelfCarousel: () => defineBookshelfCarousel
});
module.exports = __toCommonJS(src_exports);

// src/web-component.ts
var ELEMENT_TAG = "book-shelf-carousel";
var CSS_TEXT = `
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
function escapeHtml(input) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function isBook(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value;
  return typeof candidate.id === "string" && typeof candidate.title === "string" && typeof candidate.spineImage === "string" && typeof candidate.spineSize === "string";
}
function isSection(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value;
  return typeof candidate.id === "string" && typeof candidate.label === "string" && Array.isArray(candidate.books) && candidate.books.every((book) => isBook(book));
}
var _sections, _initialSectionId, _bookDetailsResolver, _activeBook, _activeSectionId, _isModalLoading, _modalError, _resolverToken, _bookIndex, _track, _dragState, _scrolledToInitial, _rootClickHandler, _keyDownHandler, _BookshelfCarouselElement_instances, onRootClick_fn, onKeyDown_fn, trapModalFocus_fn, handleBookOpen_fn, applyResolvedBookDetails_fn, openModal_fn, closeModal_fn, attachDragToScroll_fn, render_fn;
var BookshelfCarouselElement = class extends HTMLElement {
  constructor() {
    super();
    __privateAdd(this, _BookshelfCarouselElement_instances);
    __privateAdd(this, _sections, []);
    __privateAdd(this, _initialSectionId);
    __privateAdd(this, _bookDetailsResolver);
    __privateAdd(this, _activeBook);
    __privateAdd(this, _activeSectionId);
    __privateAdd(this, _isModalLoading, false);
    __privateAdd(this, _modalError, "");
    __privateAdd(this, _resolverToken, 0);
    __privateAdd(this, _bookIndex, /* @__PURE__ */ new Map());
    __privateAdd(this, _track, null);
    __privateAdd(this, _dragState, { isPointerDown: false, startX: 0, startLeft: 0 });
    __privateAdd(this, _scrolledToInitial, false);
    __privateAdd(this, _rootClickHandler);
    __privateAdd(this, _keyDownHandler);
    this.attachShadow({ mode: "open" });
    __privateSet(this, _rootClickHandler, (event) => __privateMethod(this, _BookshelfCarouselElement_instances, onRootClick_fn).call(this, event));
    __privateSet(this, _keyDownHandler, (event) => __privateMethod(this, _BookshelfCarouselElement_instances, onKeyDown_fn).call(this, event));
  }
  get sections() {
    return __privateGet(this, _sections);
  }
  set sections(value) {
    const safeValue = Array.isArray(value) ? value.filter((section) => isSection(section)) : [];
    __privateSet(this, _sections, safeValue);
    __privateGet(this, _bookIndex).clear();
    __privateSet(this, _scrolledToInitial, false);
    __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  }
  get initialSectionId() {
    return __privateGet(this, _initialSectionId);
  }
  set initialSectionId(value) {
    __privateSet(this, _initialSectionId, typeof value === "string" && value.length > 0 ? value : void 0);
    __privateSet(this, _scrolledToInitial, false);
    __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  }
  get bookDetailsResolver() {
    return __privateGet(this, _bookDetailsResolver);
  }
  set bookDetailsResolver(value) {
    __privateSet(this, _bookDetailsResolver, typeof value === "function" ? value : void 0);
  }
  connectedCallback() {
    __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
    this.shadowRoot?.addEventListener("click", __privateGet(this, _rootClickHandler));
    this.shadowRoot?.addEventListener("keydown", __privateGet(this, _keyDownHandler));
  }
  disconnectedCallback() {
    this.shadowRoot?.removeEventListener("click", __privateGet(this, _rootClickHandler));
    this.shadowRoot?.removeEventListener("keydown", __privateGet(this, _keyDownHandler));
  }
};
_sections = new WeakMap();
_initialSectionId = new WeakMap();
_bookDetailsResolver = new WeakMap();
_activeBook = new WeakMap();
_activeSectionId = new WeakMap();
_isModalLoading = new WeakMap();
_modalError = new WeakMap();
_resolverToken = new WeakMap();
_bookIndex = new WeakMap();
_track = new WeakMap();
_dragState = new WeakMap();
_scrolledToInitial = new WeakMap();
_rootClickHandler = new WeakMap();
_keyDownHandler = new WeakMap();
_BookshelfCarouselElement_instances = new WeakSet();
onRootClick_fn = function(event) {
  const target = event.target;
  if (target.closest("[data-modal-close]")) {
    __privateMethod(this, _BookshelfCarouselElement_instances, closeModal_fn).call(this);
    return;
  }
  const bookButton = target.closest("[data-book-id]");
  if (!bookButton) {
    return;
  }
  const bookId = bookButton.dataset.bookId;
  if (!bookId) {
    return;
  }
  const detail = __privateGet(this, _bookIndex).get(bookId);
  if (!detail) {
    return;
  }
  this.dispatchEvent(
    new CustomEvent("book-click", {
      detail,
      bubbles: true,
      composed: true
    })
  );
  void __privateMethod(this, _BookshelfCarouselElement_instances, handleBookOpen_fn).call(this, detail);
};
onKeyDown_fn = function(event) {
  if (event.key === "Escape" && __privateGet(this, _activeBook)) {
    event.preventDefault();
    __privateMethod(this, _BookshelfCarouselElement_instances, closeModal_fn).call(this);
    return;
  }
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    const target = event.target;
    if (!target.closest(".track")) {
      return;
    }
    event.preventDefault();
    const diff = event.key === "ArrowRight" ? 220 : -220;
    __privateGet(this, _track)?.scrollBy({ left: diff, behavior: "smooth" });
    return;
  }
  if (event.key === "Tab" && __privateGet(this, _activeBook)) {
    __privateMethod(this, _BookshelfCarouselElement_instances, trapModalFocus_fn).call(this, event);
  }
};
trapModalFocus_fn = function(event) {
  const modal = this.shadowRoot?.querySelector(".modal-card");
  if (!modal) {
    return;
  }
  const selectors = [
    "button:not([disabled])",
    "a[href]",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  const focusables = Array.from(modal.querySelectorAll(selectors));
  if (focusables.length === 0) {
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = this.shadowRoot?.activeElement;
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};
handleBookOpen_fn = async function(detail) {
  __privateMethod(this, _BookshelfCarouselElement_instances, openModal_fn).call(this, detail.book, detail.sectionId);
  const resolver = __privateGet(this, _bookDetailsResolver);
  if (!resolver) {
    return;
  }
  const token = ++__privateWrapper(this, _resolverToken)._;
  __privateSet(this, _isModalLoading, true);
  __privateSet(this, _modalError, "");
  __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  try {
    const result = await resolver(detail);
    if (token !== __privateGet(this, _resolverToken) || !__privateGet(this, _activeBook)) {
      return;
    }
    __privateMethod(this, _BookshelfCarouselElement_instances, applyResolvedBookDetails_fn).call(this, result);
    __privateSet(this, _isModalLoading, false);
    __privateSet(this, _modalError, "");
    __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  } catch {
    if (token !== __privateGet(this, _resolverToken)) {
      return;
    }
    __privateSet(this, _isModalLoading, false);
    __privateSet(this, _modalError, "Failed to load additional book details.");
    __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  }
};
applyResolvedBookDetails_fn = function(result) {
  if (!result || !__privateGet(this, _activeBook)) {
    return;
  }
  __privateSet(this, _activeBook, {
    ...__privateGet(this, _activeBook),
    ...result,
    id: __privateGet(this, _activeBook).id,
    title: result.title ?? __privateGet(this, _activeBook).title,
    spineImage: result.spineImage ?? __privateGet(this, _activeBook).spineImage,
    spineSize: result.spineSize ?? __privateGet(this, _activeBook).spineSize
  });
};
openModal_fn = function(book, sectionId) {
  __privateSet(this, _activeBook, book);
  __privateSet(this, _activeSectionId, sectionId);
  __privateSet(this, _isModalLoading, false);
  __privateSet(this, _modalError, "");
  __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  this.dispatchEvent(
    new CustomEvent("modal-open", {
      detail: { book, sectionId },
      bubbles: true,
      composed: true
    })
  );
  const closeButton = this.shadowRoot?.querySelector(".modal-close");
  closeButton?.focus();
};
closeModal_fn = function() {
  const detail = __privateGet(this, _activeBook) && __privateGet(this, _activeSectionId) ? { book: __privateGet(this, _activeBook), sectionId: __privateGet(this, _activeSectionId) } : void 0;
  __privateSet(this, _resolverToken, __privateGet(this, _resolverToken) + 1);
  __privateSet(this, _activeBook, void 0);
  __privateSet(this, _activeSectionId, void 0);
  __privateSet(this, _isModalLoading, false);
  __privateSet(this, _modalError, "");
  __privateMethod(this, _BookshelfCarouselElement_instances, render_fn).call(this);
  this.dispatchEvent(
    new CustomEvent("modal-close", {
      detail,
      bubbles: true,
      composed: true
    })
  );
};
attachDragToScroll_fn = function(track) {
  const state = __privateGet(this, _dragState);
  track.addEventListener("pointerdown", (event) => {
    state.isPointerDown = true;
    state.startX = event.clientX;
    state.startLeft = track.scrollLeft;
    track.classList.add("dragging");
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener("pointermove", (event) => {
    if (!state.isPointerDown) {
      return;
    }
    const delta = event.clientX - state.startX;
    track.scrollLeft = state.startLeft - delta;
  });
  const finish = () => {
    state.isPointerDown = false;
    track.classList.remove("dragging");
  };
  track.addEventListener("pointerup", finish);
  track.addEventListener("pointercancel", finish);
  track.addEventListener("pointerleave", finish);
};
render_fn = function() {
  if (!this.shadowRoot) {
    return;
  }
  const previousScroll = __privateGet(this, _track)?.scrollLeft ?? 0;
  __privateGet(this, _bookIndex).clear();
  const itemsMarkup = __privateGet(this, _sections).map((section) => {
    const separator = `
          <div class="item" data-section-id="${escapeHtml(section.id)}">
            <div class="separator" aria-label="${escapeHtml(section.label)}">
              ${section.separatorImage ? `<img src="${escapeHtml(section.separatorImage)}" alt="${escapeHtml(section.label)}">` : '<div class="separator-fallback" aria-hidden="true"></div>'}
              <div class="separator-label">${escapeHtml(section.label)}</div>
            </div>
          </div>
        `;
    const books = section.books.map((book) => {
      __privateGet(this, _bookIndex).set(book.id, { book, sectionId: section.id });
      return `
              <div class="item" data-section-id="${escapeHtml(section.id)}">
                <button class="book-btn" data-book-id="${escapeHtml(book.id)}" aria-label="${escapeHtml(book.title)}">
                  <img class="spine spine-${escapeHtml(book.spineSize)}" src="${escapeHtml(book.spineImage)}" alt="${escapeHtml(book.title)}" loading="lazy" decoding="async">
                </button>
              </div>
            `;
    }).join("");
    return `${separator}${books}`;
  }).join("");
  const activeBook = __privateGet(this, _activeBook);
  const activeMeta = activeBook?.meta ? Object.entries(activeBook.meta).map(([key, value]) => `
            <div class="meta-line">
              <div class="meta-key">${escapeHtml(key)}</div>
              <div>${escapeHtml(value)}</div>
            </div>
          `).join("") : "";
  const modalMarkup = activeBook ? `
          <div class="modal-root open" role="presentation">
            <div class="modal-backdrop" data-modal-close="true"></div>
            <section class="modal-card" role="dialog" aria-modal="true" aria-label="Book details">
              <button class="modal-close" data-modal-close="true" aria-label="Close">Close</button>
              <div class="modal-content">
                <img class="modal-cover" src="${escapeHtml(activeBook.coverImage ?? activeBook.spineImage)}" alt="${escapeHtml(activeBook.title)}">
                <div>
                  <div class="meta-title">${escapeHtml(activeBook.title)}</div>
                  ${activeBook.author ? `<div class="meta-author">${escapeHtml(activeBook.author)}</div>` : ""}
                  ${__privateGet(this, _isModalLoading) ? '<div class="modal-loading">Loading details...</div>' : ""}
                  ${__privateGet(this, _modalError) ? `<div class="modal-error">${escapeHtml(__privateGet(this, _modalError))}</div>` : ""}
                  ${activeBook.description ? `<div class="meta-description">${escapeHtml(activeBook.description)}</div>` : ""}
                  ${activeMeta ? `<div class="meta-list">${activeMeta}</div>` : ""}
                  ${activeBook.purchaseUrl ? `<a class="purchase-link" href="${escapeHtml(activeBook.purchaseUrl)}" target="_blank" rel="noreferrer noopener">Purchase</a>` : ""}
                </div>
              </div>
            </section>
          </div>
        ` : '<div class="modal-root" role="presentation"></div>';
  this.shadowRoot.innerHTML = `
      <style>${CSS_TEXT}</style>
      <section class="bookshelf">
        <div class="track" tabindex="0" aria-label="Bookshelf carousel">${itemsMarkup}</div>
      </section>
      ${modalMarkup}
    `;
  const track = this.shadowRoot.querySelector(".track");
  if (!track) {
    return;
  }
  __privateSet(this, _track, track);
  __privateMethod(this, _BookshelfCarouselElement_instances, attachDragToScroll_fn).call(this, track);
  track.scrollLeft = previousScroll;
  if (__privateGet(this, _initialSectionId) && !__privateGet(this, _scrolledToInitial)) {
    const firstItem = track.querySelector(`[data-section-id="${__privateGet(this, _initialSectionId)}"]`);
    if (firstItem) {
      firstItem.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
    }
    __privateSet(this, _scrolledToInitial, true);
  }
};
BookshelfCarouselElement.tagName = ELEMENT_TAG;
function defineBookshelfCarousel(tagName = ELEMENT_TAG) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, BookshelfCarouselElement);
  }
}
defineBookshelfCarousel();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookshelfCarouselElement,
  defineBookshelfCarousel
});
//# sourceMappingURL=index.cjs.map