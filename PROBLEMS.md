# PROBLEMS.md

## Sticky menu compensation

**Проблема:** Контент секций заезжает под sticky-меню (`SiteMenu`) при скролле. Добавление `padding-top` в `BaseSection.astro` ломает layout секции `main` — картинка съезжает вниз.

### Варианты решения

**A. Padding только в новых секциях**
- Не трогать `BaseSection.astro`
- Добавить `pt-12 md:pt-14 lg:pt-[4rem]` к каждой новой секции отдельно (не к `main`)
- `scroll-mt-*` добавить аналогично
- **Плюс:** не ломает `main`
- **Минус:** дублирование классов в каждой секции

**B. Обёртка `<slot/>` с padding**
- В `BaseSection.astro` обернуть `<slot/>` в `<div class="pt-12 md:pt-14 lg:pt-[4rem]">`
- В секции `main` переопределить padding через `!pt-0` или inline-style
- **Плюс:** единообразие
- **Минус:** дополнительный div, нужно исключать `main`

**C. Глобальный CSS через `@layer base`**
- Добавить в `global.css`:
  ```css
  @layer base {
    section {
      scroll-margin-top: 3rem;
    }
    section:not(#main) {
      padding-top: 3rem;
    }
  }
  ```
- Адаптивные брекпойнты через `@media`
- **Плюс:** централизованное управление
- **Минус:** `@media` в CSS противоречит философии Tailwind

**D. CSS-переменная + `calc()`**
- Определить `--header-height` в `@theme`
- Использовать `padding-top: var(--header-height)` в `BaseSection`
- Для `main` переопределить через `!pt-0`
- **Плюс:** единообразие единиц измерения
- **Минус:** всё ещё нужно исключать `main`

**E. Отдельный компонент `ContentSection.astro`**
- Создать новый компонент с padding для обычных секций
- `BaseSection` оставить без padding (используется для `main`)
- **Плюс:** чистое разделение ответственности
- **Минус:** ещё один компонент
