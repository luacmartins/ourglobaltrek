// Using a function to return the query and injecting variables to make use of useSWR's caching feature.
// I guess the shallow comparison of arrays in the keys does not cache data with the same key. 

export default function photoByCategories({ first, before, query }) {
   return `query photoByCategories {
  photos(first: ${first}, before: "${before}", where: { categoryIn: [${[...query]}] }) {
    nodes {
      slug
      title
      databaseId
      content
      featuredImage {
        node {
          sourceUrl
          srcSet
        }
      }
      categories(where: {childless: true, exclude: ["25", "1981", "1982"], excludeTree: "2096"}) {
        nodes {
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`
}