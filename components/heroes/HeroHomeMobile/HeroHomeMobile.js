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
      <div className='md:hidden relative top-0 w-screen h-176'>
        <div className='absolute top-0 right-0 w-screen h-24 bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute w-full h-120'>
          <Image
            loader={loader}
            src={sourceUrl}
            layout={"fill"}
            className='object-cover -z-10 object-right'
          />
        </div>
        <div className='mt-96 bg-blue-50 mx-4 p-4 rounded-lg overflow-hidden'>
          <div className='text-gray-800 text-2xl font-medium'>{title}</div>
          <div
            className='text-gray-500 font-light leading-snug mt-3'
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <Newsletter />
        </div>
      </div>
    </>
  )
}
