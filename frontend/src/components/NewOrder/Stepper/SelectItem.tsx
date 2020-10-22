import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import useStyles from './base';
import { Item } from '../../../model';
import SelectCategoryTab from './SelectCategoryTab';
import { DrinkList, FoodList } from './CategoryList';

interface SelectItemProps {
  items: Item[],
  handleSet: (item: Item) => void
  defaultItems?: Item[]
}

export const SelectItem: React.FC<SelectItemProps> = ({ items, handleSet, defaultItems = [] }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState<Item[]>([]);

  React.useEffect(() => {
    setValues(defaultItems);
  }, [defaultItems])

  const handleChange = (item: Item) => {
    const exist = values.find(value => value.id === item.id);

    if (!exist && item.count !== 0) {
      const newValues = [...values, {id: item.id, name: name, count: item.count}]

      setValues(newValues);
      // handleSet(newValues);
      return;
    }

    if (exist && item.count === 0) {
      let newValues = values.filter(value => value.id !== item.id);

      setValues(newValues);
      // handleSet(newValues);
      return;
    }

    if (exist && item.count !== 0) {
      let newValues = [...values];
      newValues.forEach(value => {
        if (value.id === item.id) {
          value.count = item.count;
        }
        return value;
      });

      setValues(newValues);
      // handleSet(newValues);
      return;
    }

    return;
  }

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          drink={<DrinkList
            items={items}
            values={values}
            handleChange={handleChange}
          />}
          food={<FoodList
            items={items}
            values={values}
            handleChange={handleChange}
          />}
        />
    </FormControl>
  )
}
