import React from 'react';
import { FormControl } from '@atoms';

interface NewOrderFormControlProps {
  children: React.ReactNode;
}

export const NewOrderFormControl = ({children}: NewOrderFormControlProps): JSX.Element => {

  return (
    <FormControl component="fieldset" style={{width: '100%'}}>
      {children}
    </FormControl>
  )
}
