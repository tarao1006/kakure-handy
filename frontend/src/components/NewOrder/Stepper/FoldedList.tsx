import * as React from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import FoldedListItem from './FoldedListItem';
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
  values?: Item[];
  handleChange: (item: Item) => void;
}

const FoldedList: React.FC<FoldedListProps> = ({ Icon, category, items, values, handleChange }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>
          {category.name}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={true} unmountOnExit>
        <List component="div" disablePadding>
          {
            items.map(item => <Content key={item.id} item={item} values={values} handleChange={handleChange} />)
          }
        </List>
      </Collapse>
    </div>
  )
}

export default FoldedList;

interface ContentProps {
  item: Item;
  values?: Item[];
  handleChange: (item: Item) => void;
}

const Content: React.FC<ContentProps> = ({ item, values, handleChange }) => {
  const classes = useStyles();
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    if (!values) {
      return;
    }
    const value = values.find(i => i.id === item.id);
    if (value) {
      setCount(value.count)
    }
  }, [values]);

  return (
    <ListItem key={item.id} className={classes.itemRoot}>
      <div>{`${item.name}`}</div>
      <div style={{textAlign: 'right'}}>{`${item.price}円`}</div>
      <FoldedListItem
        item={item}
        onChange={handleChange}
      />
  </ListItem>
  )
}
