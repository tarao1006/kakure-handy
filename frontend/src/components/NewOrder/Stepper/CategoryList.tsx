import * as React from 'react';
import {
  List,
  FormGroup,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FoldedList from './FoldedList';
import useStyles from './base';
import { Item } from '../../../model'
import drink from '@dataset/categoriesDrink.json';
import food from '@dataset/categoriesFood.json';

interface CategoryListProps {
  items: Item[];
  values?: Item[];
  handleChange: (item: Item) => void;
}

export const DrinkList: React.FC<CategoryListProps> = ({ items, values, handleChange }) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.content}>
      <List className={classes.scrollArea}>
        {
          drink.map((category, index) => (
            <FoldedList
              Icon={InboxIcon}
              key={index}
              category={category}
              items={items.filter(item => item.subcategoryId === category.id)}
              values={values}
              handleChange={handleChange}
            />
          ))
        }
      </List>
    </FormGroup>
  )
}

export const FoodList: React.FC<CategoryListProps> = ({ items, values, handleChange }) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.content}>
      <List className={classes.scrollArea}>
        {
          food.map((category, index) => (
            <FoldedList
              key={index}
              Icon={InboxIcon}
              category={category}
              items={items.filter(item => item.subcategoryId === category.id)}
              values={values}
              handleChange={handleChange}
            />
          ))
        }
      </List>
    </FormGroup>
  )
}
