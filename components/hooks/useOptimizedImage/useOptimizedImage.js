export default function useOptimizedImage(data) {
  const srcRegex = /https?:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)"/gm
  const srcRegex2 = /https?:\/\/server.ourglobaltrek.com\/wp-content\/uploads\/(.*?)"/gm
  const srcRegex3 = /\/travel-blog\/wp-content\/uploads\/(.*?)"/gm
  const srcSetRegex = /https?:\/\/www.ourglobaltrek.com\/wp-content\/uploads\/(.*?)\s(\d+)/gm
  const srcSetRegex2 = /https?:\/\/server.ourglobaltrek.com\/wp-content\/uploads\/(.*?)\s(\d+)/gm
  const srcSetRegex3 = /\/travel-blog\/wp-content\/uploads\/(.*?)\s(\d+)/gm

  let result

  result = data.replace(
    srcRegex,
    `/images/$1"`
  )

  result = result.replace(
    srcRegex2,
    `/images/$1"`
  )

  result = result.replace(
    srcRegex3,
    `/images/$1"`
  )

  result = result.replace(
    srcSetRegex,
    `/images/$1 $2`
  )

  result = result.replace(
    srcSetRegex2,
    `/images/$1 $2`
  )

  result = result.replace(
    srcSetRegex3,
    `/images/$1 $2`
  )

  result = result.replace(
    /\(max-width: 1440px\) 100vw, 1440px/gm,
    '(max-width: 767px) 480px, (max-width: 1023px) 770px, 840px'
  )

  return result
}
