/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getCartData = (token, cartId) => useQuery(Schema.getCart,
    {
        variables: { cartId },
        context: {
            request: 'internal',
            headers: {
                Authorization: typeof window === 'undefined' ? `Bearer ${token}` : '',
            },
        },
        fetchPolicy: 'cache-and-network',
    });
