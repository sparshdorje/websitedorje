import { shopifyInstance } from './ShopifyService';

const CollectionService = {
  getCollections: async () => {
    return shopifyInstance.post('/', {
      query: `
      query getCollections {
        collections(first: 100) {
          edges {
            cursor
            node {
              id
              handle
              title
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }   
            `,
    });
  },
  getCollectionByHandle: async ({ handle }) => {
    return shopifyInstance.post('/', {
      query: `
      query getCollectionByHandle {
        collection(handle: "${handle}") {
          id
          title
          description
          image{
            id
            url
            width
            height
            altText
      }
        }
      }`,
    });
  },
  getProductsInCollection: async ({ handle }) => {
    return shopifyInstance.post('/', {
      query: `query getProductsInCollection {
        collection(handle: "${handle}") {
          products(first: 250, sortKey: BEST_SELLING) {
            edges {
              node {
                id
                title
                vendor
                description
                handle
                availableForSale
                images(first: 1) {
                  edges {
                    node {
                      id
                      url
                      width
                      height
                      altText
                    }
                  }
                }
                variants(first: 100) {
                  edges {
                    cursor
                    node {
                      availableForSale
                      selectedOptions{
                        name
                        value
                      }
                      id
                      title
                      image{
                        url
                      }
                      price {
                        amount
                        currencyCode
                      }
                      product{
                        title
                        id
                      }
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }`,
    });
  },
};

export default CollectionService;
