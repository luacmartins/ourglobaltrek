export default function Article({ data }) {
   return (
      <>
         <article className="mx-4 md:mx-8 lg:w-1/2 lg:mx-auto" dangerouslySetInnerHTML={{ __html: data }}></article>
      </>
   )
}