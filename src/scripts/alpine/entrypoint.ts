import type { Alpine } from "alpinejs";

interface GalleryStore {
  activeCategory: number;
  setCategory(index: number): void;
}

export default (Alpine: Alpine) => {
  Alpine.store<GalleryStore>("gallery", {
    activeCategory: 0,
    setCategory(index: number) {
      this.activeCategory = index;
    }
  });
};
