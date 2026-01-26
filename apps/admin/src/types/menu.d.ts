declare namespace Menu {
  type MenuCategoryKey = import('@/features/menus/menu-category').MenuCategoryKey;

  type Menus = Map<MenuCategoryKey, CommonMenu[]>;
}
