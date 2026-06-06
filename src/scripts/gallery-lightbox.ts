/**
 * Gallery Lightbox — zero‑dependency vanilla-TS lightbox.
 */

const BUTTON_SELECTOR = ".gallery-btn";
const OVERLAY_SELECTOR = ".lightbox-overlay";

let currentIndex = -1;
let overlay: HTMLElement | null = null;
let isInitialized = false;

function getVisibleButtons(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(BUTTON_SELECTOR))
    .filter(btn => btn.offsetParent !== null);
}

function close(): void {
  currentIndex = -1;
  overlay?.remove();
  overlay = null;
}
function render(btns: HTMLElement[]): void {
  overlay?.remove();
  if (currentIndex < 0) return;

  const urls = btns.map(b => b.dataset.src ?? "");

  overlay = document.createElement("div");
  overlay.className = `lightbox-overlay fixed inset-0 z-[100] bg-black/90 flex items-center justify-center`;

  let zoomed = false;
  const img = document.createElement("img");
  img.src = urls[currentIndex];
  img.alt = "";
  img.draggable = false;
  img.className = "max-h-[85vh] max-w-[90vw] object-contain select-none cursor-zoom-in transition-transform duration-300";

  img.addEventListener("click", (e) => {
    e.stopPropagation();
    zoomed = !zoomed;
    img.style.transform = zoomed ? "scale(1.5)" : "scale(1)";
    img.style.transformOrigin = "center center";
  });

  const inner = document.createElement("div");
  inner.className = "relative flex items-center justify-center flex-col";
  inner.appendChild(img);
  overlay.appendChild(inner);

  const counter = document.createElement("span");
  counter.className = "absolute top-4 left-4 text-white/50 text-sm";
  counter.textContent = `${currentIndex + 1} / ${urls.length}`;
  overlay.appendChild(counter);

  const prevArea = document.createElement("div");
  prevArea.className = "absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center cursor-pointer z-10 text-white/30 hover:text-white/80 hover:bg-black/20 transition-all text-4xl";
  prevArea.textContent = "\u2039";
  prevArea.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      currentIndex--;
      render(btns);
    }
  });
  overlay.appendChild(prevArea);

  const nextArea = document.createElement("div");
  nextArea.className = "absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center cursor-pointer z-10 text-white/30 hover:text-white/80 hover:bg-black/20 transition-all text-4xl";
  nextArea.textContent = "\u203A";
  nextArea.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < urls.length - 1) {
      currentIndex++;
      render(btns);
    }
  });
  overlay.appendChild(nextArea);

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.className = "absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none w-10 h-10 flex items-center justify-center cursor-pointer z-10";
  closeBtn.textContent = "\u2715";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });
  overlay.appendChild(closeBtn);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.body.appendChild(overlay);
}

function onDocumentClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (target.closest(`.${OVERLAY_SELECTOR.split(".")[1]}`)) return;
  const btn = target.closest<HTMLElement>(BUTTON_SELECTOR);
  if (!btn) return;
  const visibleBtns = getVisibleButtons();
  const idx = visibleBtns.indexOf(btn);
  if (idx !== -1) {
    currentIndex = idx;
    render(visibleBtns);
  }
}

function onDocumentKeydown(e: KeyboardEvent): void {
  if (currentIndex < 0) return;
  if (e.key === "Escape") {
    close();
    return;
  }
  const visibleBtns = getVisibleButtons();
  if (e.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex--;
    render(visibleBtns);
  } else if (e.key === "ArrowRight" && currentIndex < visibleBtns.length - 1) {
    currentIndex++;
    render(visibleBtns);
  }
}

function attachListeners(): void {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentKeydown);
}

function detachListeners(): void {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
}

function initLightbox(): void {
  // Always clean up any stray overlay from a previous page (defensive)
  document.querySelectorAll<HTMLElement>(OVERLAY_SELECTOR).forEach(el => el.remove());
  overlay = null;
  if (isInitialized) return;
  attachListeners();
  isInitialized = true;
}

function teardownLightbox(): void {
  close();
  detachListeners();
  isInitialized = false;
}

document.addEventListener("astro:before-swap", teardownLightbox);
document.addEventListener("astro:page-load", initLightbox);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightbox);
} else {
  initLightbox();
}
