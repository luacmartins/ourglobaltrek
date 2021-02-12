// COMPONENTS
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import useOverlay from '../../hooks/useOverlay'
import useScroll from '../../hooks/useScroll'
import Search from '../../common/Search'

export default function NavbarMobile({ links }) {
   const [isMenuOpen, toggleMenu] = useOverlay()
   const [isSearchOpen, toggleSearch] = useOverlay()
   const { isBelowOffset } = useScroll(50)

   return (
      <>
         {/* NAVBAR */}
         <nav className={
            `md:hidden fixed h-14 top-0 w-screen flex justify-between items-center z-10 text-gray-900 ` +
            `${isBelowOffset ? 'bg-blur-5 bg-white bg-opacity-75' : 'bg-transparent'}`
         }>

            {/* SEARCH */}
            <button onClick={toggleSearch} className="flex items-center justify-center h-14 w-14 focus:outline-none">
               <svg className="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M22.133 20.133l7.2 7.2-2 2-7.2-7.2c-1.867 1.467-4.133 2.267-6.667 2.267-6 0-10.8-4.8-10.8-10.8s4.8-10.933 10.8-10.933 10.8 4.8 10.8 10.8c0 2.533-0.8 4.8-2.133 6.667zM13.467 21.6c4.533 0 8.133-3.6 8.133-8.133s-3.6-8.133-8.133-8.133-8.133 3.6-8.133 8.133 3.6 8.133 8.133 8.133z"></path></svg>
            </button>

            {/* LOGO */}
            <div>
               <Link href="/">
                  <a>
                     <svg className="h-12 fill-current" viewBox="0 0 65 32" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M-1-1h802v602H-1z" /><g><path d="M18.797 11.42l-1.583-.662C19.459 4.523 25.29.001 32.171.001s12.696 4.506 14.812 10.757l-1.583.517c-1.858-5.572-7.139-9.417-13.229-9.417s-11.387 3.99-13.374 9.562zM45.206 20.45l1.603.614c-1.928 6.166-7.603 10.849-14.485 10.93A15.635 15.635 0 0117.2 21.97l1.566-.565c2.024 5.384 7.42 9.064 13.507 8.878s11.264-4.206 12.934-9.833v.001z" /><text fontWeight="bold" stroke="null" transform="matrix(.39744 0 0 .39744 12.076 10.403)" fontFamily="'Quicksand'" fontSize="24" y="21.117" x="-27.043" fillOpacity="null" strokeOpacity="null" strokeWidth="0">ourglobaltrek</text></g></svg>
                  </a>
               </Link>
            </div>

            {/* MENU BUTTON */}
            <button className="flex items-center justify-center h-14 w-14 focus:outline-none" onClick={toggleMenu}>
               <svg className="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img"><path d="M0 9.333v-2.667h32v2.667h-32zM10.667 25.333v-2.667h21.333v2.667h-21.333zM5.333 17.333v-2.667h26.667v2.667h-26.667z"></path></svg>
            </button>
         </nav>

         {/* SEARCH OVERLAY */}
         <Transition
            show={isSearchOpen}
            enter={'transition-opacity duration-75'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'transition-opacity duration-75'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
         >
            <Search toggle={toggleSearch} />
         </Transition>

         {/* MENU OVERLAY */}
         <Transition
            show={isMenuOpen}
            enter={'transition-opacity duration-75'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'transition-opacity duration-75'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
         >
            <div className="fixed md:hidden w-screen h-screen inset-0 flex flex-col bg-white bg-opacity-75 bg-blur-5 z-10">

               {/* CLOSE */}
               <div className="w-full h-14 flex justify-end">
                  <button onClick={toggleMenu} className="h-14 w-14 flex items-center text-gray-600 justify-center focus:outline-none">
                     <svg className="h-6 fill-current" viewBox="0 0 329.269 329" xmlns="http://www.w3.org/2000/svg"><path d="M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" /></svg>
                  </button>
               </div>

               {/* CONTENT */}
               <div className="flex flex-col flex-1 justify-between items-center pb-20 pt-32">
                  {/* LINKS */}
                  <div className="flex flex-col text-3xl font-light text-center text-gray-600">
                     {links.map(link => (
                        <Link key={link.label} href={link.path}>
                           <a className="py-2 my-2 px-4 transition-colors duration-100 hover:text-gray-900">{link.label}</a>
                        </Link>
                     ))}
                  </div>

                  {/* SOCIAL */}
                  <div className="flex space-x-6 text-gray-600">
                     <a className="transition-colors duration-100 hover:text-gray-900" href="https://www.facebook.com/ourglobaltrek" target="_blank">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z" /></svg>
                     </a>
                     <a className="transition-colors duration-100 hover:text-gray-900" href="https://www.instagram.com/ourglobaltrek/" target="_blank">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 511 511.9" xmlns="http://www.w3.org/2000/svg"><path d="M510.95 150.5c-1.2-27.2-5.598-45.898-11.9-62.102-6.5-17.199-16.5-32.597-29.6-45.398-12.802-13-28.302-23.102-45.302-29.5-16.296-6.3-34.898-10.7-62.097-11.898C334.648.3 325.949 0 256.449 0s-78.199.3-105.5 1.5c-27.199 1.2-45.898 5.602-62.097 11.898-17.204 6.5-32.602 16.5-45.403 29.602-13 12.8-23.097 28.3-29.5 45.3-6.3 16.302-10.699 34.9-11.898 62.098C.75 177.801.449 186.5.449 256s.301 78.2 1.5 105.5c1.2 27.2 5.602 45.898 11.903 62.102 6.5 17.199 16.597 32.597 29.597 45.398 12.801 13 28.301 23.102 45.301 29.5 16.3 6.3 34.898 10.7 62.102 11.898 27.296 1.204 36 1.5 105.5 1.5s78.199-.296 105.5-1.5c27.199-1.199 45.898-5.597 62.097-11.898a130.934 130.934 0 0074.903-74.898c6.296-16.301 10.699-34.903 11.898-62.102 1.2-27.3 1.5-36 1.5-105.5s-.102-78.2-1.3-105.5zm-46.098 209c-1.102 25-5.301 38.5-8.801 47.5-8.602 22.3-26.301 40-48.602 48.602-9 3.5-22.597 7.699-47.5 8.796-27 1.204-35.097 1.5-103.398 1.5s-76.5-.296-103.403-1.5c-25-1.097-38.5-5.296-47.5-8.796C94.551 451.5 84.45 445 76.25 436.5c-8.5-8.3-15-18.3-19.102-29.398-3.5-9-7.699-22.602-8.796-47.5-1.204-27-1.5-35.102-1.5-103.403s.296-76.5 1.5-103.398c1.097-25 5.296-38.5 8.796-47.5C61.25 94.199 67.75 84.1 76.352 75.898c8.296-8.5 18.296-15 29.398-19.097 9-3.5 22.602-7.7 47.5-8.801 27-1.2 35.102-1.5 103.398-1.5 68.403 0 76.5.3 103.403 1.5 25 1.102 38.5 5.3 47.5 8.8 11.097 4.098 21.199 10.598 29.398 19.098 8.5 8.301 15 18.301 19.102 29.403 3.5 9 7.699 22.597 8.8 47.5 1.2 27 1.5 35.097 1.5 103.398s-.3 76.301-1.5 103.301zm0 0" /><path d="M256.45 124.5c-72.598 0-131.5 58.898-131.5 131.5s58.902 131.5 131.5 131.5c72.6 0 131.5-58.898 131.5-131.5s-58.9-131.5-131.5-131.5zm0 216.8c-47.098 0-85.302-38.198-85.302-85.3s38.204-85.3 85.301-85.3c47.102 0 85.301 38.198 85.301 85.3s-38.2 85.3-85.3 85.3zm0 0M423.852 119.3c0 16.954-13.747 30.7-30.704 30.7-16.953 0-30.699-13.746-30.699-30.7 0-16.956 13.746-30.698 30.7-30.698 16.956 0 30.703 13.742 30.703 30.699zm0 0" /></svg>
                     </a>
                  </div>
               </div>
            </div>
         </Transition>
      </>
   )
}