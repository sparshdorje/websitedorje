import { shopifyInstance } from './ShopifyService';

const UserService = {
  createUser: async (requestObject) => {
    return shopifyInstance.post('/', {
      query: `mutation createCustomerAccount($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }`,
      variables: {
        input: requestObject, // Pass requestObject directly as input
      },
    });
  },
  getAccessToken: async (requestObject) => {
    return shopifyInstance.post('/', {
      query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }`,
      variables: {
        input: requestObject,
      },
    });
  },
  getUserDetail: async (customerAccessToken) => {
    return shopifyInstance.post('/', {
      query: `query CustomerMetafields($customerAccessToken: String!){
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          numberOfOrders
          phone
          updatedAt
          displayName
          firstName
          lastName
          createdAt
          acceptsMarketing
          defaultAddress{
            address1
            city
            phone
            company
            country
            zip
          }
          orders(first:100, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                name
                orderNumber
                processedAt
                fulfillmentStatus
                statusUrl
                totalPrice{
                  amount
                  currencyCode
                }
                orderNumber
              }
            }
          }
        }
      }`,
      variables: {
        customerAccessToken,
      },
    });
  },
};

export default UserService;
