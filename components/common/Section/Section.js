import Link from 'next/link'

export default function Section({ tag, title, children, link, href }) {
   return (
      <>
         <section className="mt-16 lg:mt-24 mx-4 md:mx-8 xl:mx-20">
            {/* HEADER */}
            {tag && <span className="text-sm text-gray-500 font-medium capitalize">{tag}</span>}
            <header className="text-3xl font-medium mb-8 capitalize">{title}</header>

            {/* CONTENT */}
            {children}

            {/* FOOTER */}
            <div className="border-t border-gray-200 my-3"></div>
            <Link href={href}>
               <a className="uppercase text-sm text-blue-500 font-medium inline-flex items-center  space-x-2 transition-colors duration-150 hover:text-blue-600">
                  <span>{link}</span>
                  <svg className="h-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M28.8 6.2l-12.8 12.8-12.8-12.8-3.2 3.2 16 16.4 16-16.4z" transform="rotate(-90 16 16)"></path></svg>
               </a>
            </Link>
         </section>
      </>
   )
}