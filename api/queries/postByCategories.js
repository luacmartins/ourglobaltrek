// Using a function to return the query and injecting variables to make use of useSWR's caching feature.
// I guess the shallow comparison of arrays in the keys does not cache data with the same key.

export default function postByCategories({ first, before, query }) {
  const where = typeof query === "string" ? `search: "${query}"` : `categoryIn: [${[...query]}]`

  return `query postByCategories {
  posts(first: ${first}, before: "${before}", where: { ${where} }) {
    nodes {
      date
      slug
      title
      excerpt
      databaseId
      featuredImage {
        node {
          sourceUrl
          srcSet
        }
      }
      author {
        node {
          name
        }
      }
      categories(where: {childless: true, excludeTree: "2096"}) {
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
