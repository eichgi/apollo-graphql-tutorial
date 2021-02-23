import React from 'react';
import styled from 'react-emotion';
import {useApolloClient} from "@apollo/client";

import {menuItemClassName} from "../components/menu-item";
import {isLoggedInVar} from "../cache";
import {ReactComponent as ExitIcon} from './../assets/icons/exit.svg';

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});

const LogoutButton: React.FC<any> = () => {
  const client = useApolloClient();

  const logoutHandler = () => {
    client.cache.evict({fieldName: 'me'});
    client.cache.gc();

    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    isLoggedInVar(false);
  };

  return (
    <StyledButton data-testid="logout-button" onClick={() => logoutHandler()}>
      <ExitIcon/>
      Logout
    </StyledButton>
  );
}

export default LogoutButton;