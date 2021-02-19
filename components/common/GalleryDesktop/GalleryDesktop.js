import Link from "next/link"
import useSlides from "../../hooks/useSlides"
import useOptimizedImage from "../../hooks/useOptimizedImage"

export default function GalleryDesktop({ images }) {
  const { view, slideLeft, slideRight } = useSlides(images.length)
  const data = images.map(image => useOptimizedImage(image))

  return (
    <>
      <div className='fixed inset-0 z-10 flex flex-col w-screen h-screen bg-white bg-opacity-75 bg-blur-5'>
        {/* CLOSE */}
        <div className='flex justify-end w-full h-14'>
          <button className='flex items-center justify-center text-gray-600 transition-colors h-14 w-14 focus:outline-none hover:text-gray-900'>
            <Link href={"/photography"}>
              <a>
                <svg
                  className='h-6 fill-current'
                  viewBox='0 0 329.269 329'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0' />
                </svg>
              </a>
            </Link>
          </button>
        </div>

        {/* CONTENT */}
        <div
          className='absolute inset-0 flex flex-col items-center justify-center px-24 mt-16 mb-14'
          dangerouslySetInnerHTML={{ __html: data[view] }}
        ></div>

        {/* DOTS */}
        <div className='absolute inset-x-0 bottom-0 flex justify-center mb-6 space-x-2'>
          {images.map((item, i) => (
            <span
              key={i}
              className={`h-2 w-2 block rounded-full ${
                view === i ? "bg-blue-500" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>

        {/* CONTROLS */}
        <div className='absolute inset-0 flex justify-between text-gray-600 top-14'>
          <button
            className='w-1/2 px-4 focus:outline-none hover:text-gray-900'
            onClick={slideLeft}
          >
            <svg
              className='fill-current transition-colors transform rotate-180 h-14'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              aria-hidden='true'
            >
              <path
                d='M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z'
                transform='rotate(-90 16 16)'
              ></path>
            </svg>
          </button>
          <button
            className='flex items-center justify-end w-1/2 px-4 hover:text-gray-900 focus:outline-none'
            onClick={slideRight}
          >
            <svg
              className='fill-current transition-colors h-14'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 32 32'
              aria-hidden='true'
            >
              <path
                d='M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z'
                transform='rotate(-90 16 16)'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
