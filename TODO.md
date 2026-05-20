Здесь и далее по окончании работы поставить чекмарк в выполненном пункте. И коммитить изменения в Git

[x] Вынести меню из @/src/pages/index.astro в отдельный компонент с возможностью повторного использования (должен лежать в @/src/components/menus/ и называться PagesMenu.astro). В компонент будет передаваться:

1. массив пунктов меню
2. url-картинки(сейчас), путь до картинки в @/src/assets/images/ - после

[x] Используя класс `.clip-clant-bottom`

```css
@layer utilities {
  .clip-slant-bottom {
    clip-path: polygon(0 0, 100% 0, 100% 81%, 0 100%);
  }
}
```

На элементе `img` в блоке, обозначенном в меню как
`<!-- Left Half: Image -->` сделать срез, к-рый будет `hidden` в мобильной версии и будет виден в настольных.

[x] Далее, у меня есть пример @/samples/OLD_VERSION/ старых наборосков к сайту и @/samples/ALPINE - пример набросков на alpine.js. Нужно объединить оформление и структуру обоих вариантов в один. Это необходимо делать постепенно. Шаг за шагом, обсуждая со мной, что будет делаться дальше.
  - [x] Создать компонентную структуру: MainSection, WorksSection, ServicesSection, AboutSection, ContactsSection
  - [x] Создать сервис-компоненты: ServiceRetouch, ServiceColorCorrection, ServiceCollage, ServiceEducation
  - [x] Обновить index.astro — заменить хардкод на импорты компонентов

[] Решить проблему компенсации высоты sticky-меню (SiteMenu) — контент заезжает под меню при скролле, а добавление padding-top в BaseSection ломает layout секции main (съезжает картинка). См. @PROBLEMS.md

