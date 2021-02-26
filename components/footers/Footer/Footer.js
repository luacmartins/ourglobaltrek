import moment from 'moment'

export default function Footer() {
  return (
    <>
      <footer className='flex items-center justify-start h-20 mx-4 mt-20 border-t border-gray-200 md:mx-8 xl:mx-20'>
        <span>© 2013 - {moment().year()} ourglobaltrek</span>
      </footer>
    </>
  )
}
