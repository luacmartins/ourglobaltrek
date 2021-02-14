import Reveal from "react-awesome-reveal"
import { keyframes } from '@emotion/react'
import useTiledGrid from '../../hooks/useTiledGrid'
import CardPhoto from '../CardPhoto'
import Spinner from '../../common/Spinner'
import Error from '../../common/Error'

export default function CardPhotoList({ data, error }) {
   const { className, height } = useTiledGrid()

   if (error) return <Error />
   if (data && !data.length) return <div>Rain check. No stories to share.</div>

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-3 mb-12 gap-y-6 md:gap-4 justify-center mt-10">
            {data && data.map((post, i) => (
               <Reveal key={post.slug} keyframes={customAnimation} triggerOnce className={className(i)} delay={i % 4 * 150}>
                  <CardPhoto data={post} height={height(i)} />
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