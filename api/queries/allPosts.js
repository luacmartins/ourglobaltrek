export default `query posts($first: Int!) {
  posts(first: $first) {
    nodes {
      author {
        node {
          name
        }
      }
      categories(where: {childless: true}) {
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