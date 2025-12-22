"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import {
  Target,
  Users,
  Globe,
  Heart,
  ArrowRight,
  Zap,
  LucideIcon,
} from "lucide-react"

import { MissionPoint,MissionCardProps } from "@/types"
 



//mission data
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




const MissionCard: React.FC<MissionCardProps> = ({ mission, index, isActive, onHover }) => {
    const IconComponent = mission.icon;
  
  return (
    <motion.div
      className={`relative p-8 rounded-3xl border backdrop-blur-sm cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'bg-white/10 border-white/30 scale-105' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} rounded-3xl opacity-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : ''
      }`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 mb-6 mx-auto flex items-center justify-center bg-white/10 rounded-2xl"
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
          <IconComponent size={32} className="text-white" />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-2xl font-bold mb-4 text-center"
          animate={isActive ? { color: "#ffffff" } : { color: "#e5e7eb" }}
        >
          {mission.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-gray-300 text-center mb-4 leading-relaxed"
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
          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400 text-center italic">
              {mission.detail}
            </p>
          </div>
        </motion.div>

        {/* Number indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
          {mission.id}
        </div>
      </div>
    </motion.div>
  );
};



//main mission section
const Mission: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // useMotionValueEvent replaces deprecated .onChange()
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setProgress(latest)
  })

  return (
    <section ref={ref} className="relative min-h-[150vh] mt-10 overflow-hidden  text-white">


      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div style={{ y, opacity, scale }} className="max-w-7xl  px-4 mt-10 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.1)",
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 20px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Target size={20} />
              <span className="text-sm font-medium">Our Mission</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming{" "}
              <motion.span
                className="bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Digital Futures
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're on a mission to build an all-in-one digital ecosystem where every individual co-exists in a unified
              system.
            </motion.p>
          </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {missionPoints.map((mission, index) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  index={index}
                  isActive={activeCard === index}
                  onHover={setActiveCard}
                />
              ))}
            </div>
          

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-gray-100 to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Join Our Mission</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </motion.button>

            <motion.p
              className="mt-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
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
