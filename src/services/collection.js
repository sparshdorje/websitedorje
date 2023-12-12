import { axiosInstance } from './ShopifyService';

const CollectionService = {
  getCollections: async () => {
    return axiosInstance.post('/', {
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
};

export default CollectionService;
