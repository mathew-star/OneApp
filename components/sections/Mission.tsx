"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  Target,
  Users,
  Globe,
  Heart,
  ArrowRight,
  Zap,
  LucideIcon,
} from "lucide-react"

// Types
interface MissionPoint {
  id: number
  icon: LucideIcon
  title: string
  description: string
  detail: string
  color: string
}

interface MissionCardProps {
  mission: MissionPoint
  index: number
  isActive: boolean
  onHover: (index: number | null) => void
  isMobile: boolean
}

// Mission data
const missionPoints: MissionPoint[] = [
  {
    id: 1,
    icon: Globe,
    title: "Build Digital Ecosystem",
    description: "Creating one platform that brings together learning, working, business, and collaboration.",
    detail:
      "We are dedicated to building an all-in-one platform that fosters meaningful connections and transforms how individuals learn, work, and collaborate, driving personal and collective growth.",
    color: "from-blue-400/20 to-cyan-400/20",
  },
  {
    id: 2,
    icon: Users,
    title: "Unlock Opportunities",
    description: "Empowering users to be the agents for unlocking boundless opportunities for every individual.",
    detail:
      "Removing barriers that prevent talented individuals from reaching their potential by unleashing opportunities for every individual through a unified ecosystem.",
    color: "from-purple-400/20 to-pink-400/20",
  },
  {
    id: 3,
    icon: Heart,
    title: "Empower Thriving Communities",
    description: "Uplifting communities through accessible and impactful technology solutions.",
    detail:
      "Building vital bridges to connect essential resources with those who need them most, empowering users to become agents of opportunity within their communities.",
    color: "from-green-400/20 to-emerald-400/20",
  },
  {
    id: 4,
    icon: Zap,
    title: "Catalyze Collaborative Growth",
    description:
      "Fostering dynamic and sustainable partnerships that empower individuals to learn, work, and thrive, building a unified and sustainable digital ecosystem.",
    detail:
      "Cultivating lasting connections that generate mutual benefits for individuals and the communities they belong to.",
    color: "from-orange-400/20 to-red-400/20",
  },
]

const MissionCard: React.FC<MissionCardProps> = ({ mission, index, isActive, onHover, isMobile }) => {
  const IconComponent = mission.icon

  return (
    <motion.div
      className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'bg-white/10 border-white/30 scale-100 sm:scale-105' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
      onMouseEnter={() => !isMobile && onHover(index)}
      onMouseLeave={() => !isMobile && onHover(null)}
      onClick={() => isMobile && onHover(isActive ? null : index)}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: isMobile ? index * 0.05 : index * 0.1,
        ease: "easeOut"
      }}
      whileHover={!isMobile ? { 
        y: -10,
        transition: { duration: 0.3 }
      } : {}}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : ''
      }`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 mx-auto flex items-center justify-center bg-white/10 rounded-xl sm:rounded-2xl"
          animate={isActive ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <IconComponent size={isMobile ? 24 : 32} className="text-white" />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-center leading-tight"
          animate={isActive ? { color: "#ffffff" } : { color: "#e5e7eb" }}
        >
          {mission.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-sm sm:text-base text-gray-300 text-center mb-3 sm:mb-4 leading-relaxed"
          animate={isActive ? { opacity: 1 } : { opacity: 0.8 }}
        >
          {mission.description}
        </motion.p>

        {/* Detail (shown when active) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-3 sm:pt-4 border-t border-white/10">
            <p className="text-xs sm:text-sm text-gray-400 text-center italic leading-relaxed">
              {mission.detail}
            </p>
          </div>
        </motion.div>

        {/* Number indicator */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
          {mission.id}
        </div>
      </div>
    </motion.div>
  )
}

// Main mission section
const Mission: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section 
      ref={ref} 
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden text-white"
    >
      <div className="relative flex items-center justify-center">
        <motion.div 
          className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm text-sm sm:text-base"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.1)",
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 20px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Target size={isMobile ? 16 : 20} />
              <span className="text-xs sm:text-sm font-medium">Our Mission</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming{" "}
              <span className="block sm:inline bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Digital Futures
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're on a mission to build an all-in-one digital ecosystem where every individual co-exists in a unified
              system.
            </motion.p>
          </motion.div>

          {/* Mission Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
            {missionPoints.map((mission, index) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={index}
                isActive={activeCard === index}
                onHover={setActiveCard}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: isMobile ? 0.3 : 1 }}
          >
            <motion.button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold text-base sm:text-lg overflow-hidden"
              whileHover={{
                scale: isMobile ? 1 : 1.05,
                boxShadow: "0 10px 40px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Join Our Mission</span>
                <motion.div 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={isMobile ? 18 : 20} />
                </motion.div>
              </span>
            </motion.button>

            <motion.p
              className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0.4 : 1.2 }}
            >
              Be part of the movement that's reshaping digital collaboration
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mission