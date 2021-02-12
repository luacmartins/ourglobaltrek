export default `query allPaths {
  posts(first: 10000) {
    nodes {
      slug
    }
  }
}`