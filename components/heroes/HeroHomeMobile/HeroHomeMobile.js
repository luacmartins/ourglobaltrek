import Image from '../../common/Image'
import Newsletter from '../../common/Newsletter'

export default function HeroHomeMobile({ data }) {
  const {
    title,
    content,
    featuredImage: {
      node: { sourceUrl },
    },
  } = data

  return (
    <>
      <div className='relative w-screen h-176'>
        <div className='absolute top-0 right-0 w-screen h-24 bg-gradient-to-b from-white'></div>
        <div className='w-full h-120'>
          <Image src={sourceUrl} layout={'fill'} className='object-cover object-right -z-10' />
        </div>
        <div className='absolute bottom-0 p-4 mx-4 overflow-hidden rounded-lg bg-blue-50'>
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
