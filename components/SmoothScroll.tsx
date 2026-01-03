import { ReactLenis, useLenis } from 'lenis/react'
import { Children } from 'react'
import type { ReactNode } from 'react'


type SmoothScrollProps = {
  children: ReactNode
}



function SmoothScroll({children}:SmoothScrollProps) {


  return (
    <>
      <ReactLenis root >
        {children}
      </ReactLenis>
      
    </>
  )
}


export default SmoothScroll

