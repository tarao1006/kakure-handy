import * as React from 'react';
import {
  FormControl,
  FormLabel,
} from '@material-ui/core';
import { SelectCategoryTab } from '@organisms';
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

interface SelectItemProps {
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
}

export const SelectItem: React.FC<SelectItemProps> = ({ activeCategory, setActiveCategory }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">注文するメニューを選択してください。</FormLabel>
        <SelectCategoryTab
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
    </FormControl>
  )
}
