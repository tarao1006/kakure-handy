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
  targetItems?: Item[];
  handleChange: (item: Item) => void;
}

const FoldedList: React.FC<FoldedListProps> = ({ Icon, category, items, targetItems, handleChange }) => {
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
            items.map(item => <FoldedListItem key={item.id} item={item} targetItems={targetItems} handleChange={handleChange} />)
          }
        </List>
      </Collapse>
    </>
  )
}

export default FoldedList;

interface FoldedListItemProps {
  item: Item;
  targetItems?: Item[];
  handleChange: (item: Item) => void;
}

const FoldedListItem: React.FC<FoldedListItemProps> = ({ item, targetItems, handleChange }) => {
  const classes = useStyles();
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (!targetItems) {
      return;
    }
    const value = targetItems.find(i => i.id === item.id);
    if (value) {
      setCount(value.count)
    }
  }, [targetItems]);

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>{`${item.name}`}</div>
      <div style={{textAlign: 'right'}}>{`${item.price}円`}</div>
      <Controller
        item={item}
        onChange={handleChange}
      />
    </ListItem>
  )
}
