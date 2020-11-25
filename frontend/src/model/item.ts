const FOOD_CATEGORY_ID = 1;
const DRINK_CATEGORY_ID = 2;
export const MIN_ORDER_COUNT = 0;
export const MAX_ORDER_COUNT = 20;

export class Item {
  id: number;
  categoryId?: number;
  subcategoryId?: number;
  name?: string;
  price?: number;
  count?: number;

  constructor(id: number, categoryId: number, subcategoryId: number, name: string, price: number) {
    this.id = id;
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
    this.name = name;
    this.price = price;
    this.count = 0;
  };

  isFood = (): boolean => {
    return this.categoryId === FOOD_CATEGORY_ID;
  };

  isDrink = (): boolean => {
    return this.categoryId === DRINK_CATEGORY_ID;
  };
}

export interface ItemDTO {
  id: number;
  category_id: number;
  subcategory_id: number;
  name: string;
  price: number;
}

export const convertToItem = (item: ItemDTO): Item => {
  return new Item(
    item.id,
    item.category_id,
    item.subcategory_id,
    item.name,
    item.price
  );
}

export const convertToItems = (items: ItemDTO[]): Item[] => {
  return items.map(item => convertToItem(item));
}
