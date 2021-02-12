import Link from 'next/link'

export default function GalleryMobile({ images }) {
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
            <div className="flex flex-col flex-1 overflow-y-scroll items-center px-4 mb-4 md:mb-12 md:px-12 xl:px-20">
               {/* IMAGE */}
               {images.map((image, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: image }}></div>
               ))}
            </div>
         </div>
      </>
   )
}