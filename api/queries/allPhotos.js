export default `query photos($first: Int!) {
  photos(first: $first) {
    nodes {
      categories(where: {parent: 1984}) {
        nodes {
          name
        }
      }
      slug
      title
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