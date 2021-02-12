export default `query Menu {
  __typename
  menuItems(where: {location: MENU_1}) {
    nodes {
      label
      path
    }
  }
}`