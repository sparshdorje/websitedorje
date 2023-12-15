import axios from 'axios';
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

export const fetchProductsByName = async ({ searchQuery }) => {
  try {
    const products = await client.product.fetchQuery({
      query: `title:${searchQuery}*`,
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

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

const shopifyStoreUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/api/2023-10/graphql`; // Replace with your store's URL and API version

export const axiosInstance = axios.create({
  baseURL: shopifyStoreUrl,
  headers: {
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
  },
});

export default client;
