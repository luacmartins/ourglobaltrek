import useData from '../../hooks/useData'
import useSize from '../../hooks/useSize'
import NavbarMobile from '../../navbars/NavbarMobile'
import NavbarDesktop from '../../navbars/NavbarDesktop'
import Footer from '../../footers/Footer'

export default function Layout({ links, children }) {
   const { isMobile } = useSize()

   return (
      <>
         <div className="flex flex-col justify-center min-h-screen text-gray-800">
            {/* NAVBARS */}
            {isMobile ? <NavbarMobile links={links} /> : <NavbarDesktop links={links} />}

            <main className="flex flex-col flex-1">
               {children}
            </main>

            <Footer />
         </div>
      </>
   )
}