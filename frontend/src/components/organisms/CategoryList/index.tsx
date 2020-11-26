import * as React from 'react';
import {
  List,
  FormGroup,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { FoldedList } from '@organisms';
import drink from '@dataset/categoriesDrink.json';
import food from '@dataset/categoriesFood.json';
import useItems from '../../../hooks/useItems';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    tabRoot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    scrollArea: {
      width: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
    },
  }),
);

export const DrinkList: React.FC<{}> = () => {
  const classes = useStyles();
  const { items } = useItems();

  return (
    <FormGroup>
      <List className={classes.scrollArea}>
        {
          drink.map((category, index) => (
            <FoldedList
              Icon={InboxIcon}
              key={index}
              category={category}
              items={items.filter(item => item.isDrink()).filter(item => item.subcategoryId === category.id)}
            />
          ))
        }
      </List>
    </FormGroup>
  )
}

export const FoodList: React.FC<{}> = () => {
  const classes = useStyles();
  const { items } = useItems();

  return (
    <FormGroup>
      <List className={classes.scrollArea}>
        {
          food.map((category, index) => (
            <FoldedList
              key={index}
              Icon={InboxIcon}
              category={category}
              items={items.filter(item => item.isFood()).filter(item => item.subcategoryId === category.id)}
            />
          ))
        }
      </List>
    </FormGroup>
  )
}
