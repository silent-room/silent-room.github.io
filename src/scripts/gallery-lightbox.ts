/**
 * Gallery Lightbox — zero‑dependency vanilla-TS lightbox.
 */

// Global flag to prevent attaching multiple document listeners across page navigations
let isLightboxInitialized = false;

export function initLightbox(): void {
  const BUTTON_SELECTOR = ".gallery-btn";

  let currentIndex = -1;
  let overlay: HTMLElement | null = null;

  function getVisibleButtons() {
    return Array.from(document.querySelectorAll<HTMLElement>(BUTTON_SELECTOR))
      .filter(btn => btn.offsetParent !== null);
  }

  function getUrls(btns: HTMLElement[]): string[] {
    return btns.map((b) => b.dataset.src ?? "");
  }

  function close(): void {
    currentIndex = -1;
    overlay?.remove();
    overlay = null;
  }

  function render(btns: HTMLElement[]): void {
    overlay?.remove();
    if (currentIndex < 0) return;

    const urls = getUrls(btns);

    overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[100] bg-black/90 flex items-center justify-center";

    let zoomed = false;
    const img = document.createElement("img");
    img.src = urls[currentIndex];
    img.className = "max-h-[85vh] max-w-[90vw] object-contain select-none cursor-zoom-in transition-transform duration-300";
    img.alt = "";
    img.draggable = false;

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      zoomed = !zoomed;
      img.className = zoomed
        ? "max-h-none max-w-none w-auto h-auto cursor-zoom-out select-none"
        : "max-h-[85vh] max-w-[90vw] object-contain select-none cursor-zoom-in transition-transform duration-300";
      overlay.className = zoomed
        ? "fixed inset-0 z-[100] bg-black/90 overflow-auto flex items-start justify-center p-4"
        : "fixed inset-0 z-[100] bg-black/90 flex items-center justify-center";
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

  // Only attach document-level listeners ONCE per session
  if (!isLightboxInitialized) {
    document.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(BUTTON_SELECTOR);
      if (!btn) return;

      const visibleBtns = getVisibleButtons();
      const idx = visibleBtns.indexOf(btn);
      
      if (idx !== -1) {
        currentIndex = idx;
        render(visibleBtns);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (currentIndex < 0) return;
      const visibleBtns = getVisibleButtons();
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex--;
        render(visibleBtns);
      }
      if (e.key === "ArrowRight" && currentIndex < visibleBtns.length - 1) {
        currentIndex++;
        render(visibleBtns);
      }
    });
    isLightboxInitialized = true;
  }
}

// Reset flag and clean overlay before page swap (Astro View Transitions)
document.addEventListener("astro:before-swap", () => {
  isLightboxInitialized = false;
  document.querySelectorAll<HTMLElement>(".fixed.inset-0.z-\\[100\\]").forEach(el => el.remove());
});

// Init on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightbox);
} else {
  initLightbox();
}

// Astro View Transitions support
document.addEventListener("astro:page-load", initLightbox);