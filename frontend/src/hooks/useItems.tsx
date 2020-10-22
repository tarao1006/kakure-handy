import { useSelector, useDispatch } from 'react-redux';
import { CombinedState, INITIALIZE_ITEM, ADD, INCREMENT, DECREMENT } from '../reducers';
import { Item } from '../model';

const useItems = () => {

  const dispatch = useDispatch();
  const items = useSelector<CombinedState, Item[]>(state => state.items.items);
  const targetItems = useSelector<CombinedState, Item[]>(state => state.items.targetItems);

  const initializeItem = (items: Item[]) => {
    dispatch({
      type: INITIALIZE_ITEM,
      items
    });
  };

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

  return { items, targetItems, initializeItem, add, increment, decrement }
}

export default useItems;
