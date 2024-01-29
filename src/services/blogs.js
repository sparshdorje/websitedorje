import { shopifyInstance } from './ShopifyService';

const BlogsService = {
  getAllBlogs: async ({ endCursor }) => {
    return shopifyInstance.post('/', {
      query: `query {
        blogs(first: 100) {
         
          edges {
            node {
              id
              title
              handle
              articles(first: 25, sortKey: PUBLISHED_AT, reverse: true, after: ${
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
                    id
                    title
                    contentHtml
                    content
                    tags
                    publishedAt
                    handle
                    excerptHtml
                    authorV2{
                      bio
                      email
                      name
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
                    image{
                      url
                    }
                    authorV2{
                      bio
                      email
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
