import * as React from 'react';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FoldedListItem } from '@organisms';
import { Item } from '../../../model';

interface FoldedListProps {
  Icon: any;
  category: { id: number, name: string };
  items: Item[];
}

export const FoldedList: React.FC<FoldedListProps> = ({ Icon, category, items }) => {
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
            items.map(item => <FoldedListItem key={item.id} item={item} />)
          }
        </List>
      </Collapse>
    </>
  )
}
