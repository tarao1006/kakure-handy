const FOOD_CATEGORY_ID = 1;
const DRINK_CATEGORY_ID = 2;

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
  }

  isFood = (): boolean => {
    return this.categoryId === FOOD_CATEGORY_ID;
  };

  isDrink = (): boolean => {
    return this.categoryId === DRINK_CATEGORY_ID;
  };
}

interface itemDTO {
  id: number;
  category_id: number;
  subcategory_id: number;
  name: string;
  price: number;
}

export const convertToItem = (object: itemDTO) => {
  return new Item(
    object.id,
    object.category_id,
    object.subcategory_id,
    object.name,
    object.price
  )
}

export const convertToItems = (objects: itemDTO[]) => {
  return objects.map(object => convertToItem(object))
}
