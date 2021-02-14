export default `query posts($first: Int!) {
  posts(first: $first) {
    nodes {
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
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`