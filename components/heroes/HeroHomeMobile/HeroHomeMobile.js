import Image from "next/image"
import Newsletter from "../../common/Newsletter"
import useLoader from "../../hooks/useLoader"

export default function HeroHomeMobile({ data }) {
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
      <div className='relative top-0 w-screen md:hidden h-176'>
        <div className='absolute top-0 right-0 w-screen h-24 bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute w-full h-120'>
          <Image
            loader={loader}
            src={sourceUrl}
            layout={"fill"}
            className='object-cover object-right -z-10'
          />
        </div>
        <div className='p-4 mx-4 overflow-hidden rounded-lg mt-96 bg-blue-50'>
          <div className='text-2xl font-medium text-gray-800'>{title}</div>
          <div
            className='mt-3 font-light leading-snug text-gray-500'
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <Newsletter />
        </div>
      </div>
    </>
  )
}
