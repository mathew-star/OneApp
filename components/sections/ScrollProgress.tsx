"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  // Subscribe to scrollYProgress changes using modern API
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest)
  })

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
        <motion.div
          className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(white ${progress * 100}%, transparent 0%)`,
          }}
        >
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
