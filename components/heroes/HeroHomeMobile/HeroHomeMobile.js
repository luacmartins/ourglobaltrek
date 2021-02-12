import Newsletter from '../../common/Newsletter'

export default function HeroHomeMobile({ data }) {
   const { title, content, featuredImage: { node: { sourceUrl, srcSet } } } = data

   return (
      <>
         <div className="md:hidden relative top-0 w-screen h-full text-white">
            <div className="absolute w-full h-120 bg-gray-900 -z-10"></div>
            <img className="absolute w-full h-120 object-cover -z-10 opacity-90" src={sourceUrl} srcSet={srcSet} alt=".." />
            <div className="mt-96 bg-blue-50 mx-4 p-4 rounded-lg overflow-hidden">
               <div className="text-gray-800 text-2xl font-medium">{title}</div>
               <div className="text-gray-500 font-light leading-snug mt-3" dangerouslySetInnerHTML={{ __html: content }}></div>
               <Newsletter />
            </div>
         </div>
      </>
   )
}