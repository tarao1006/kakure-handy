import React from 'react';
import { FormLabel } from '@atoms';

export const NewOrderFormLabel = ({children}): JSX.Element => {

  return (
    <FormLabel component="legend">{children}</FormLabel>
  )
}
