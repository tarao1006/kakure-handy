import React, { useState, useEffect } from 'react';
import {
  Collapse,
  ListItem,
  ListItemText
} from '@atoms';
import { ExpandLess, ExpandMore } from '@icons';

interface CategoryListItemProps {
  title: string;
  index: number;
  open: boolean;
  onClick: (index: number) => void;
  collapsedContent: React.ReactNode;
}

export const CategoryListItem = ({
  title,
  index,
  open,
  onClick,
  collapsedContent
}: CategoryListItemProps): JSX.Element => {

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick(index);
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          {title}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        {collapsedContent}
      </Collapse>
    </>
  )
}
