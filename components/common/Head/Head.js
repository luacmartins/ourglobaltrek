import Head from 'next/head'

export default function MetaHead({title, description, children}) {
   return (
     <>
       <Head>
         <title>{title ? `${title} - ` : ''}ourglobaltrek</title>
         <link rel='icon' href='favicon.ico' />
         <meta name="google-site-verification" content="yB1HHt-lcDyglEKwpZe-Lju82vsbrKw9U6IjAB_VejE"></meta>
         <meta name="description" content={description?.metaDesc || description?.opengraphDescription}></meta>
         {children}
       </Head>
     </>
   )
}