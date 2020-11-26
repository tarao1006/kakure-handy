import * as React from 'react';
import { Header, MainContainer } from '@organisms';
import { LayoutProvider } from './contexts/layout';

export const Layout = ({ children }): JSX.Element => {

  return (
    <LayoutProvider>
      <Header />
      <MainContainer>
        {children}
      </MainContainer>
    </LayoutProvider>
  )
}
