export default function useOptimizedImage(data) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN
  const srcRegex = /http:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)"/gm
  const srcSetRegex = /https:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)\s(\d+)/gm

  let result

  result = data.replace(
    srcRegex,
    `https://cdn.statically.io/img/${domain}/f=auto,h=560/wp-content/uploads/$1"`
  )

  result = result.replace(
    srcSetRegex,
    `https://cdn.statically.io/img/${domain}/f=auto,w=$1/wp-content/uploads/$1 $2`
  )

  result = result.replace(
    /\(max-width: 1440px\) 100vw, 1440px/gm,
    '(max-width: 767px) 480px, (max-width: 1023px) 770px, 840px'
  )

  return result
}
