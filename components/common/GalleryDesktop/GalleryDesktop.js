import Link from 'next/link'
import useSlides from '../../hooks/useSlides'

export default function GalleryDesktop({ images }) {
   const { view, slideLeft, slideRight } = useSlides(images.length)

   return (
      <>
         <div className="flex fixed w-screen h-screen inset-0 flex-col bg-white bg-opacity-75 bg-blur-5 z-10">

            {/* CLOSE */}
            <div className="w-full h-14 flex justify-end">
               <button className="h-14 w-14 flex items-center text-gray-600 justify-center focus:outline-none hover:text-gray-900 transition-colors">
                  <Link href={'/photography'}>
                     <a>
                        <svg className="h-6 fill-current" viewBox="0 0 329.269 329" xmlns="http://www.w3.org/2000/svg"><path d="M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" /></svg>
                     </a>
                  </Link>
               </button>
            </div>

            {/* CONTENT */}
            <div className="absolute inset-0 mt-16 mb-14 flex flex-col items-center justify-center px-24" dangerouslySetInnerHTML={{ __html: images[view] }}></div>

            {/* DOTS */}
            <div className="absolute bottom-0 inset-x-0 flex justify-center space-x-2 mb-6">
               {images.map((item, i) => (
                  <span key={i} className={`h-2 w-2 block rounded-full ${view === i ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
               ))}
            </div>

            {/* CONTROLS */}
            <div className="absolute inset-0 top-14 flex text-gray-600 justify-between">
               <button className="w-1/2 px-4 focus:outline-none hover:text-gray-900" onClick={slideLeft}>
                  <svg className="h-14  transition-colors fill-current transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z" transform="rotate(-90 16 16)"></path></svg>
               </button>
               <button className="w-1/2 flex justify-end items-center px-4 hover:text-gray-900 focus:outline-none" onClick={slideRight}>
                  <svg className="h-14 transition-colors fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z" transform="rotate(-90 16 16)"></path></svg>
               </button>
            </div>
         </div>
      </>
   )
}