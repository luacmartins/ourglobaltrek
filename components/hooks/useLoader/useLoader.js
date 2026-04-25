export default function useLoader() {
  const regex =
    /(?:https?:\/\/[^/]+)?(?:\/travel-blog)?\/wp-content\/uploads\/(.*)/i

  const loader = ({ src }) => {
    const match = String(src || '').match(regex)
    if (match) return `/images/${match[1]}`
    return src
  }

  return loader
}
