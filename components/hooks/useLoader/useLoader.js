export default function useLoader() {
  const regex = /https:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*)/

  const loader = ({ src, width, quality }) => {
    const path = src.match(regex)[1]
    return `https://cdn.statically.io/img/ourglobaltrek.com/f=auto,w=${width}${
      quality ? `,q=${quality}` : ""
    }/wp-content/uploads/${path}`
  }

  return loader
}
