import Link from 'next/link'

export default function Section({ tag, title, children, link, href }) {
   return (
      <>
         <section className="mx-4 mt-16 lg:mt-24 md:mx-8 xl:mx-20">
            {/* HEADER */}
            {tag && <span className="text-sm font-medium text-gray-500 capitalize">{tag}</span>}
            <header className="mb-8 text-3xl font-medium capitalize">{title}</header>

            {/* CONTENT */}
            {children}

            {/* FOOTER */}
            <div className="my-3 border-t border-gray-200"></div>
            <Link href={href}>
               <a className="inline-flex items-center text-sm font-medium text-blue-500 uppercase  space-x-2 transition-colors duration-150 hover:text-blue-600">
                  <span>{link}</span>
                  <svg className="h-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z" transform="rotate(-90 16 16)"></path></svg>
               </a>
            </Link>
         </section>
      </>
   )
}