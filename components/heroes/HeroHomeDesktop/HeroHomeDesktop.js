import Image from "next/image"
import useLoader from "../../hooks/useLoader"
import Newsletter from "../../common/Newsletter"

export default function HeroHome({ data }) {
  const {
    title,
    content,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data
  const loader = useLoader()

  return (
    <>
      <div className='relative hidden md:block'>
        <div className='w-screen h-176 lg:min-h-176 lg:h-screen'>
          <Image
            loader={loader}
            src={sourceUrl}
            layout={"fill"}
            className='object-cover'
            alt='..'
          />
        </div>

        {/* GRADIENTS */}
        <div className='absolute top-0 right-0 w-screen h-24 bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute inset-0 w-3/5 h-176 lg:h-screen bg-gradient-to-r from-white to-transparent opacity-80'></div>
        <div className='absolute bottom-0 w-screen h-1/3 bg-gradient-to-t from-white to-transparent'></div>

        <div className='absolute bottom-0 left-0 w-1/2 mb-8 ml-8 lg:mb-16 xl:ml-20 lg:w-2/5 space-y-8 lg:space-y-10'>
          {/* TEXT */}
          <div className='text-4xl font-semibold lg:text-5xl'>{title}</div>
          <div
            className='text-2xl lg:text-3xl'
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>

          {/* NEWSLETTER */}
          <Newsletter />
        </div>
      </div>
    </>
  )
}
