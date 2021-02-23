import React from 'react';
import {gql, useQuery} from '@apollo/client';

import {Header, Loading} from './../components';
import {CartItem, BookTrips} from "../containers";
import {RouteComponentProps} from '@reach/router';
import {GetCartItems} from "./__generated__/GetCartItems";

interface CartProps extends RouteComponentProps {
}

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

const Cart: React.FC<CartProps> = () => {
  const {data, loading, error} = useQuery<GetCartItems>(GET_CART_ITEMS);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Header>My Cart</Header>
      {
        data?.cartItems.length === 0
          ? <p data-testid="empty-message">No items in your car</p>
          : (
            <>
              {data?.cartItems.map((launchId: any) => (
                <CartItem launchId={launchId} key={launchId}/>
              ))}
              <BookTrips cartItems={data?.cartItems || []}/>
            </>
          )
      }
    </>
  );
}

export default Cart;