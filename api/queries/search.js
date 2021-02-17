export default function search({ first, before, query }) {
   return `query search {
  posts(first: ${first}, before: "${before}", where: { search: "${query}" }) {
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