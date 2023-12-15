import { axiosInstance } from './ShopifyService';

const ProductService = {
  getAllProducts: async () => {},
  getProductByHandle: async ({ productHandle }) => {
    return axiosInstance.post('/', {
      query: `query getProductByHandle {
        product(handle: "${productHandle}") {
          id
          title
          description
          productType
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
};

export default ProductService;
