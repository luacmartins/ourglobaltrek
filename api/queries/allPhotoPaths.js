export default `query Photos {
  photos(first: 10000) {
    nodes {
      slug
    }
  }
}`