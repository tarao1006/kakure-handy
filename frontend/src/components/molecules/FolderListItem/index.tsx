import React, { useState } from 'react';
import {
  Collapse,
  ListItem,
  ListItemText
} from '@atoms';
import { ExpandLess, ExpandMore } from '@icons';

interface FolderListItemProps {
  title: string;
  collapsedContent: React.ReactNode;
}

export const FolderListItem = ({
  title,
  collapsedContent
}: FolderListItemProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open)
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
