import { shopifyInstance } from './ShopifyService';

const CartService = {
  createCartWithLineItems: async (lineItems = []) => {
    return shopifyInstance.post('/', {
      query: `
      mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            createdAt
            updatedAt
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            attributes {
              key
              value
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }  `,
      variables: {
        cartInput: {
          lines: lineItems,
        },
      },
    });
  },
};

export default CartService;
