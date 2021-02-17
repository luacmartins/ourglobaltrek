import Image from 'next/image'

export default function HeroPage({ image, title, tags }) {
   return (
      <>
         <div className="relative top-0 w-screen h-96 md:h-132 lg:h-164">
            {/* GRADIENTS */}
            <div className="absolute w-full h-96 md:h-132 lg:h-164 ">
               <Image src={image} className="object-cover -z-10" layout={'fill'} />
            </div>
            <div className="absolute inset-0 w-3/5 h-96 md:h-132 lg:h-164 bg-gradient-to-r from-white to-transparent opacity-80 -z-10"></div>
            <div className="absolute top-0 right-0 w-screen h-32 bg-gradient-to-b from-white to-transparent -z-10"></div>
            <div className="absolute bottom-0 w-screen h-1/2 bg-gradient-to-t from-white to-transparent -z-10"></div>

            <div className="absolute bottom-0 mb-8 md:mb-16 lg:mb-32 mx-4 md:mx-8 xl:mx-20 md:w-3/4 rounded-lg overflow-hidden ">
               {/* TITLE */}
               <div className="text-4xl md:text-5xl lg:text-6xl font-semibold">{title}</div>

               {/* TAG */}
               {tags && <div className="flex items-center font-medium mt-2 text-xs md:text-sm xl:text-base space-x-1 text-gray-500">
                  {tags.map((tag, i) => (
                     <div key={i}>
                        <span>{tag}</span>
                        {(i !== tags.length - 1) && <span> • </span>}
                     </div>
                  ))}
               </div>}
            </div>
         </div>
      </>
   )
}