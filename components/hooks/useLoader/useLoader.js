export default function useLoader() {
  const regex = /https?:\/\/server.ourglobaltrek.com\/wp-content\/uploads\/(.*)/
  const domain = process.env.NEXT_PUBLIC_DOMAIN

  const loader = ({ src, width, quality }) => {
    const path = src.match(regex)[1]
    return `https://cdn.statically.io/img/${domain}/f=auto,w=${width}${
      quality ? `,q=${quality}` : ''
    }/wp-content/uploads/${path}`
  }

  return loader
}
