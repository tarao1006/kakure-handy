import * as React from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import FoldedListItem from './FoldedListItem';
import { Item } from '../../../model';

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
