export interface Item {
  id: number
  categoryId?: number
  subcategoryId?: number
  name?: string
  price?: number
  count?: number
}

interface itemDTO {
  id: number;
  category_id: number;
  subcategory_id: number;
  name: string;
  price: number;
}

export const convertToItem = (object: itemDTO) => {
  return {
    id: object.id,
    categoryId: object.category_id,
    subcategoryId: object.subcategory_id,
    name: object.name,
    price: object.price,
    count: 0
  }
}

export const convertToItems = (objects: itemDTO[]) => {
  return objects.map(object => convertToItem(object))
}
