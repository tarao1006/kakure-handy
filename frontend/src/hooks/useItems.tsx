import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Item, Table, convertToItems, convertToTables, MIN_ORDER_COUNT, MAX_ORDER_COUNT } from '../model';

const INITIALIZE = 'INITIALIZE';
const ADD = 'ADD';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

interface ItemState {
  items: Item[];
  targetItems: Item[];
}

const initialState: ItemState = {
  items: [],
  targetItems: [],
}

const reducer = (state = initialState, action: any) => {

  const handleSetItem = (state: ItemState, item: Item): ItemState => {
    let items = [...state.items];
    const itemIdx = items.findIndex(element => element.id === item.id);
    items[itemIdx] = item;

    let targetItems = [...state.targetItems];
    const targetItemIdx = targetItems.findIndex(element => element.id === item.id);
    if (targetItemIdx === -1) {
      targetItems.push(item);
    } else {
      targetItems[targetItemIdx] = item;
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
    case INITIALIZE:
      return {
        items: action.items,
        targetItems: []
      };
    case ADD:
      return handleSetItem(state, action.item);
    case INCREMENT:
      return handleIncrement(state, action.id);
    case DECREMENT:
      return handleDecrement(state, action.id);
    default:
      return state;
  }
}

export const store = createStore(reducer);

const useItems = () => {

  const dispatch = useDispatch();
  const items = useSelector<ItemState, Item[]>(state => state.items);
  const targetItems = useSelector<ItemState, Item[]>(state => state.targetItems);

  const initialize = (items: Item[]) => {
    dispatch({
      type: INITIALIZE,
      items
    })
  }

  const add = (item: Item) => {
    dispatch({
      type: ADD,
      item
    });
  };

  const increment = (id: number) => {
    dispatch({
      type: INCREMENT,
      id
    });
  };

  const decrement = (id: number) => {
    dispatch({
      type: DECREMENT,
      id
    });
  };

  return { items, targetItems, initialize, add, increment, decrement }
}

export default useItems;
