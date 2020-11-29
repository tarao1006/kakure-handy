import { Category, CategoryDTO } from '@model';
export const FOOD_CATEGORY_ID = 1;
export const DRINK_CATEGORY_ID = 2;
export const COURSE_CATEGORY_ID = 3;
export const MIN_ORDER_COUNT = 0;
export const MAX_ORDER_COUNT = 20;

export class Item {
  id: number;
  name: string;
  price: number;
  category: Category;
  count?: number;

  constructor(id: number, name: string, price: number, category: Category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.count = 0;
  };

  isFood = (): boolean => {
    return this.category.id === FOOD_CATEGORY_ID;
  };

  isDrink = (): boolean => {
    return this.category.id === DRINK_CATEGORY_ID;
  };

  isCourse = (): boolean => {
    return this.category.id === COURSE_CATEGORY_ID;
  };
}

export interface ItemDTO {
  id: number;
  category: CategoryDTO;
  name: string;
  price: number;
}

export const convertToItem = (item: ItemDTO): Item => {
  return new Item(
    item.id,
    item.name,
    item.price,
    {
      id: item.category.id,
      name: item.category.name,
      categoryTypeId: item.category.category_type_id,
      categoryTypeName: item.category.category_type_name,
    },
  );
}

export const convertToItems = (items: ItemDTO[]): Item[] => {
  return items.map(item => convertToItem(item));
}
