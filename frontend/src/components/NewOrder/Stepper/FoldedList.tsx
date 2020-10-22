import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Controller from './Controller';
import { Item } from '../../../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemRoot: {
      display: 'grid',
      gridTemplateColumns: '55% 15% 1fr',
      justifyContent: 'space-between',
    },
    input: {
      width: '5ch',
      padding: 0,
    },
  })
);

interface FoldedListProps {
  Icon: any;
  category: { id: number, name: string };
  items: Item[];
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

const FoldedList: React.FC<FoldedListProps> = ({ Icon, category, items, handleSet, increment, decrement }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>
          {category.name}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          {
            items.map(item => (
              <FoldedListItem
                key={item.id}
                item={item}
                handleSet={handleSet}
                increment={increment}
                decrement={decrement}
              />
            ))
          }
        </List>
      </Collapse>
    </>
  )
}

export default FoldedList;

interface FoldedListItemProps {
  item: Item;
  handleSet: (item: Item) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

const FoldedListItem: React.FC<FoldedListItemProps> = ({ item, handleSet, increment, decrement }) => {
  const classes = useStyles();
  const [count, setCount] = React.useState<number>(item.count);

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>{`${item.name}`}</div>
      <div style={{textAlign: 'right'}}>{`${item.price}円`}</div>
      <Controller
        item={item}
        handleSet={handleSet}
        increment={increment}
        decrement={decrement}
      />
    </ListItem>
  )
}
