import { shopifyInstance } from './ShopifyService';

//https://judge.me/api/v1/reviews

// url: dorjeteas.myshopify.com
// shop_domain: dorjeteas.myshopify.com
// platform: shopify
// name: Abhishek
// email: abhishekyadav6700.ay@gmail.com
// rating: 5
// title: Good product!
// body: Good product!
// id: 7470969454817

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
};

export default ProductService;
