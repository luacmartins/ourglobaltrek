import Link from 'next/link'

export default function CardPhoto({ data, height }) {
   const { title, slug, featuredImage: { node: { sourceUrl, srcSet } }, categories: { nodes: categories } } = data

   return (
      <>
         <Link href={`/photography/${slug}`}>
            <a>
               <div className="flex flex-col relative overflow-hidden rounded transition-opacity cursor-pointer hover:opacity-90">
                  <img className={`w-full object-cover ${height}`} src={sourceUrl} alt=".." />
                  <div className="absolute w-full h-2/5 bottom-0 bg-gradient-to-t from-gray-800 to-transparent opacity-75"></div>
                  <div className="absolute bottom-0 m-4 text-white">
                     {categories[0] && <div className="font-medium text-sm md:text-xs lg:text-sm">{categories[0].name}</div>}
                     <div className="text-3xl md:text-xl lg:text-2xl font-bold line-clamp-1">{title}</div>
                  </div>
               </div>
            </a>
         </Link>
      </>
   )
}