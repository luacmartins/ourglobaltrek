import Reveal from "react-awesome-reveal"
import { keyframes } from '@emotion/react'
import useSize from '../../hooks/useSize'
import CardPost from '../CardPost'
import Spinner from '../../common/Spinner'
import Error from '../../common/Error'

export default function CardPostList({ data, isLoading, error, home }) {
   const { width, height } = useSize()
   const delay = (i) => {
      // Math.ceil((height - 174) / 120) Returns the number of cards on the screen
      // 174 is the height in px of the menu and filter bars, 120 is the height of the mobile card.
      if (width < 768) return i % Math.ceil((height - 174) / 120) * 150
      if (width < 1024) return i % 6 * 150
      return i % 8 * 150
   }

   if (isLoading) return <Spinner />
   if (error) return <Error />
   if (!data.length) return <div>Rain check. No stories to share.</div>

   return (
      <>
         <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 featured justify-center mt-8 mb-8 ` + `${home ? 'gap-6 md:gap-8' : 'gap-6 md:gap-x-8 md:gap-y-16'}`}>
            {data.map((post, i) => (
               <Reveal key={post.slug} keyframes={customAnimation} triggerOnce className={home && !i ? 'md:col-span-3 lg:col-span-4' : ''} delay={delay(i)}>
                  <CardPost data={post} featured={home && !i} />
               </Reveal>
            ))}
         </div>
      </>
   )
}

const customAnimation = keyframes(`
   from {
      opacity: 0;
      transform: scale(1.1);
   }
   to {
      opacity: 1;
      transform: scale(1);
   }
   `)