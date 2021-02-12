export default `query photos($first: Int!) {
  photos(first: $first) {
    nodes {
      categories(where: {exclude: ["25", "1981", "1982"]}) {
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