import useOptimizedImage from "../../hooks/useOptimizedImage"

export default function Article({ data }) {
  const post = useOptimizedImage(data)

  return (
    <>
      <article
        className='mx-4 md:mx-8 lg:w-3/4 lg:mx-8 xl:mx-20 xl:w-3/5 text-lg md:text-xl wordpress leading-relaxed font-light md:leading-9'
        dangerouslySetInnerHTML={{ __html: post }}
      ></article>
    </>
  )
}
