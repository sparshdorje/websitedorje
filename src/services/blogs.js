import { shopifyInstance } from './ShopifyService';

const BlogsService = {
  getAllBlogs: async ({ endCursor, articleSize = 25 }) => {
    return shopifyInstance.post('/', {
      query: `query {
        blogs(first: 100) {
          edges {
            node {
              id
              title
              handle
              articles(first: ${articleSize}, sortKey: PUBLISHED_AT, reverse: true, after: ${
        endCursor ? JSON.stringify(endCursor) : null
      }) {
                pageInfo {
                    hasNextPage
                    endCursor
                  }
                edges {
                  node {
                    image{
                      url
                    }
                    authorV2{
                      name
                    }
                    id
                    title
                    contentHtml
                    content
                    tags
                    publishedAt
                    handle
                    excerptHtml
                    excerpt
                  }
                }
              }
            }
          }
        }
      }`,
    });
  },
  getBlogsByHandle: async ({ handle }) => {
    return shopifyInstance.post('/', {
      query: `query {
        blogs(first: 1) {
          edges {
            node {
                articleByHandle(handle: "${handle}"){
                    id
                    title
                    contentHtml
                    content
                    tags
                    publishedAt
                    handle
                    excerptHtml
                    excerpt
                    image{
                      url
                    }
                    authorV2{
                      name
                    }
                }             
            }
          }
        }
      }`,
    });
  },
};

export default BlogsService;
