import { shopifyInstance } from './ShopifyService';

const ProductService = {
  getAllProducts: async () => {
    return shopifyInstance.post('/', {
      query: `query getProductsAndVariants {
        products(first: 250) {
          edges {
            cursor
            node {
              id
              title
              description
              handle
              images(first: 100) {
                edges {
                  node {
                    id
                    originalSrc
                    altText
                    url
                  }
                }
              }
              variants(first: 1) {
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
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    });
  },
  getBestSellingProducts: async () => {
    return shopifyInstance.post('/', {
      query: `query getProductsAndVariants {
        products(first: 5, sortKey: TITLE) {
          edges {
            cursor
            node {
              id
              title
              description
              handle
              images(first: 100) {
                edges {
                  node {
                    id
                    originalSrc
                    altText
                    url
                  }
                }
              }
              variants(first: 1) {
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
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    });
  },
  getProductByHandle: async ({ productHandle }) => {
    return shopifyInstance.post('/', {
      query: `query getProductByHandle {
        product(handle: "${productHandle}") {
          id
          title
          description
          productType
          tags
          metafield( key: "rating"){
            type
            value
          }
          priceRange{
            maxVariantPrice{
              amount
              currencyCode
            }
            minVariantPrice{
              amount
              currencyCode
            }
          }
          handle
          descriptionHtml
          createdAt
          availableForSale
          options {
            id
            name
            values
          }
          images(first: 100) {
            edges {
              node {
                id
                originalSrc
                altText
                url
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
                  handle
                }
              }
            }
          }
        }
      }`,
    });
  },
  getRelatedProduct: async ({ productId }) => {
    return shopifyInstance.post('/', {
      query: ` query getProductRecommendations {
        productRecommendations(productId: "${productId}") {
          id
          title
          handle
          variants(first: 1) {
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
                  handle
                }
              }
            }
          }
          images(first: 100) {
          edges {
          node {
            id
            originalSrc
            altText
            url
           }
          }
        }

        }
      }`,
    });
  },
  getProductsBySearchText: async ({ searchText }) => {
    return shopifyInstance.post('/', {
      query: `
        query getProductsBySearchText {
          products(query: "title:${searchText}*", first: 6) {
            edges {
              node {
                id
                title
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                handle
                images(first: 100) {
                  edges {
                    node {
                      id
                      originalSrc
                      altText
                      url
                    }
                  }
                }
                variants(first: 1) {
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
                        handle
                      }
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

export default ProductService;
