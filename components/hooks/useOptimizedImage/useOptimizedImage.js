export default function useOptimizedImage(data) {
  const srcRegex = /http:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)"/gm
  const srcSetRegex = /https:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)\s(\d+)/gm

  let result

  result = data.replace(
    srcRegex,
    'https://cdn.statically.io/img/ourglobaltrek.com/f=auto,w=900/wp-content/uploads/$1"'
  )

  result = result.replace(
    srcSetRegex,
    "https://cdn.statically.io/img/ourglobaltrek.com/f=auto,w=$2/wp-content/uploads/$1 $2"
  )

  return result
}
