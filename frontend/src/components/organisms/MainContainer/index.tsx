import * as React from 'react';
import { Container } from '@atoms';

export const MainContainer = ({ children }): JSX.Element => {

  return (
    <Container component="main" maxWidth="xs">
      {children}
    </Container>
  )
}