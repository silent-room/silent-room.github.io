import type { Alpine } from "alpinejs";

interface GalleryStore {
  activeCategory: number | null;
  setCategory(index: number | null): void;
}

export default (Alpine: Alpine) => {
  Alpine.store<GalleryStore>("gallery", {
    activeCategory: null,
    setCategory(index: number | null) {
      this.activeCategory = index;
    }
  });
};
