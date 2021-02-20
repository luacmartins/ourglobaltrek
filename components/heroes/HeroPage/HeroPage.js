import Image from '../../common/Image'

export default function HeroPage({ image, title, tags }) {
  return (
    <>
      <div className='relative top-0 w-screen h-96 md:h-132 lg:h-164'>
        {/* GRADIENTS */}
        <div className='absolute w-full h-96 md:h-132 lg:h-164 -z-10'>
          <Image src={image} className='object-cover object-right' layout={'fill'} />
        </div>
        <div className='absolute inset-0 w-3/5 h-96 md:h-132 lg:h-164 bg-gradient-to-r from-white opacity-80 -z-10'></div>
        <div className='absolute top-0 right-0 w-screen h-32 bg-gradient-to-b from-white -z-10'></div>
        <div className='absolute bottom-0 w-screen h-1/2 bg-gradient-to-t from-white -z-10'></div>

        <div className='absolute bottom-0 mx-4 mb-8 overflow-hidden rounded-lg md:mb-16 lg:mb-32 md:mx-8 xl:mx-20 md:w-3/4 '>
          {/* TITLE */}
          <h1 className='text-4xl font-semibold md:text-5xl lg:text-6xl'>{title}</h1>

          {/* TAG */}
          {tags && (
            <div className='flex items-center mt-2 space-x-1 text-xs font-medium text-gray-500 md:text-sm xl:text-base'>
              {tags.map((tag, i) => (
                <div key={i}>
                  <span>{tag}</span>
                  {i !== tags.length - 1 && <span> • </span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
