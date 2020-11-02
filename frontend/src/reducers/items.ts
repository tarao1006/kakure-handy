import { Item, MIN_ORDER_COUNT, MAX_ORDER_COUNT } from '../model';

export const INITIALIZE_ITEM = 'INITIALIZE_ITEM';
export const ADD_ITEM = 'ADD_ITEM';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';

export interface ItemState {
  items: Item[];
  targetItems: Item[];
}

const initialState: ItemState = {
  items: [],
  targetItems: [],
}

export const items = (state = initialState, action: any) => {

  const handleSetItem = (state: ItemState, item: Item): ItemState => {
    let items = [...state.items];
    const itemIdx = items.findIndex(element => element.id === item.id);
    items[itemIdx] = item;

    let targetItems = [...state.targetItems];
    const targetItemIdx = targetItems.findIndex(element => element.id === item.id);
    if (targetItemIdx === -1) {
      targetItems.push(item);
    } else {
      if (item.count === 0) {
        targetItems = targetItems.filter(targetItem => targetItem.id !== item.id);
      } else {
        targetItems[targetItemIdx] = item;
      }
    }

    return { items, targetItems }
  };

  const handleIncrement = (state: ItemState, id: number): ItemState => {
    const item = findNewItem(id);
    item.count = Math.min(item.count + 1, MAX_ORDER_COUNT);
    return handleSetItem(state, item);
  };

  const handleDecrement = (state: ItemState, id: number): ItemState => {
    const item = findNewItem(id);
    item.count = Math.max(item.count - 1, MIN_ORDER_COUNT);
    return handleSetItem(state, item);
  };

  const findNewItem = (id: number): Item => {
    const targetItemIdx = state.targetItems.findIndex(element => element.id === id);
    let newItem: Item;
    if (targetItemIdx === -1) {
      const item = state.items.find(item => item.id === id);
      newItem = Object.assign({}, item);
    } else {
      newItem = Object.assign({}, state.targetItems[targetItemIdx]);
    }
    return newItem;
  };

  switch (action.type) {
    case INITIALIZE_ITEM:
      return {
        items: action.items,
        targetItems: []
      };
    case ADD_ITEM:
      return handleSetItem(state, action.item);
    case INCREMENT_ITEM:
      return handleIncrement(state, action.id);
    case DECREMENT_ITEM:
      return handleDecrement(state, action.id);
    default:
      return state;
  }
}
