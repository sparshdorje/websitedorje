import { shopifyInstance } from './ShopifyService';

const CartService = {
  createCartWithSingleItem: async (cartInput) => {
    return shopifyInstance.post('/', {
      query: `
        mutation createCart($cartInput: ${cartInput}) {
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
          }
              `,
    });
  },
};

export default CartService;
