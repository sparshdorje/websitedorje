import Client from 'shopify-buy/index.unoptimized.umd';

const client = Client.buildClient({
  domain: `${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}`,
  storefrontAccessToken: `${process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN}`,
});

export const fetchProducts = async () => {
  try {
    const products = await client.product.fetchAll(100);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// export const fetchProductsByPage = async (perPage = 10, page = 1) => {
//   try {
//     const productsQuery = client.graphQLClient.query((root) => {
//       root.addConnection('products', { args: { first: 200 } }, (product) => {
//         product.add('title');
//         product.add('tags'); // Add fields to be returned
//       });
//     });

//     const variables = {
//       first: perPage,
//       cursor: page !== 1 ? `gid://shopify/Product/${page}` : null,
//     };

//     const productsData = await client.graphQLClient.send(
//       productsQuery,
//       variables
//     );

//     if (productsData && productsData.model && productsData.model.products) {
//       return productsData.data.products.edges.map((edge) => edge.node);
//     } else {
//       throw new Error('Products not found or invalid response format');
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// };

export const addToCart = async (productId, quantity = 1) => {
  try {
    const checkout = await client.checkout.create();
    const lineItemsToAdd = [
      {
        variantId: productId,
        quantity: quantity,
      },
    ];
    const updatedCheckout = await client.checkout.addLineItems(
      checkout.id,
      lineItemsToAdd
    );
    return updatedCheckout.webUrl; // Return the URL for the checkout
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return null;
  }
};

export default client;
