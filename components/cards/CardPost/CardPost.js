import Link from 'next/link'
import moment from 'moment'

export default function CardPost({ data, featured }) {
   const {
      title,
      date,
      featuredImage: { node: { sourceUrl, srcSet } },
      categories,
      slug,
      excerpt
   } = data

   const tags = [moment(date).format('MMM D, YYYY')]

   return (
      <>
         <div className={"w-full flex " + `${featured ? 'flex-col md:flex-row' : 'justify-between items-center md:flex-col'}`}>
            {/* IMAGE */}
            <Link href={`/travel-blog/${slug}`}>
               <a className={`${featured ? 'w-full md:w-1/2 lg:mr-8' : 'w-24 h-24 md:w-full md:h-48 order-2 md:order-none'}` + " overflow-hidden block rounded"}>
                  <img className="w-full h-full object-cover transform transition-transform hover:scale-110 duration-300" src={sourceUrl} srcSet={srcSet} alt=".." />
               </a>
            </Link>

            <div className={`${featured ? 'w-full md:w-1/2 md:pl-10 xl:pl-12 flex flex-col justify-center mt-4 md:mt-0' : 'w-full flex-1 pr-4 md:pr-0 md:mt-4'}`}>
               {/* COUNTRY & TITLE */}
               {categories.nodes[0] && <div className="text-blue-500 font-medium text-sm">
                  {categories.nodes[0].name}
               </div>}
               <Link href={`/travel-blog/${slug}`} >
                  <a>
                     <div className="text-xl md:text-2xl font-semibold line-clamp-2 leading-7 hover:underline">{title}</div>
                  </a>
               </Link>

               {/* TAGS */}
               <div className="flex items-center font-medium mt-1 text-xs space-x-1 text-gray-500">
                  {tags.map((tag, i) => (
                     <div key={i}>
                        <span>{tag}</span>
                        {(i !== tags.length - 1) && <span> • </span>}
                     </div>
                  ))}
               </div>

               {/* EXCERPT */}
               {excerpt && <div className={`${featured ? 'line-clamp-2 md:line-clamp-3 lg:line-clamp-4 mb-6 md:mb-0' : 'hidden md:flex md:line-clamp-2'}` + " mt-6 md:mt-4"} dangerouslySetInnerHTML={{ __html: excerpt }}></div>}

            </div>
         </div>
      </>
   )
}