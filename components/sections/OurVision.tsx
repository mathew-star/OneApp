'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Brain, Globe, Heart, Lightbulb,Zap ,Rocket } from 'lucide-react';
import { FaUsersGear } from "react-icons/fa6";

import type { Feature, VisionBlock } from '@/types';

//Data
const features: Feature[] = [
  {
    title: "Unified Digital Ecosystem",
    description:
      "One platform that brings together learning, working, and collaboration. Break down silos and create seamless connections across all aspects of professional and personal growth.",
    icon: Globe,
    highlight: "democratizes opportunities",
    stats: "10M+ connections made",
  },
  {
    title: "Smart Opportunity Matching",
    description:
      "AI-powered system that understands your skills, aspirations, and values to connect you with meaningful work and like-minded collaborators who share your vision.",
    icon: Brain,
    highlight: "connects skilled individuals",
    stats: "85% match success rate",
  },
  {
    title: "Community Empowerment",
    description:
      "Technology designed to uplift underserved communities by providing equal access to opportunities, resources, and networks that drive real change.",
    icon: Heart,
    highlight: "empowers underserved communities",
    stats: "500+ communities served",
  },
  {
    title: "Sustainable Collaboration",
    description:
      "Foster long-term partnerships and collaborative relationships that create lasting impact. Build networks that grow stronger over time and benefit everyone involved.",
    icon: Lightbulb,
    highlight: "transforms how people thrive",
    stats: "99% retention rate",
  },
];

const visionBlocks: VisionBlock[] = [
  {
    key: "ecosystem",
    title: "Unified Digital Ecosystem",
    subtitle: "One Platform, Endless Possibilities",
    description: "Breaking down barriers between learning, working, and collaboration",
    icon: <Globe className='w-10 h-10'/>,
    delay: 0,
  },
  {
    key: "opportunities",
    title: "Democratize Opportunities",
    subtitle: "Equal Access for Everyone",
    description: "Making meaningful work and connections available to all",
    icon: <Zap className='w-10 h-10'/>,
    delay: 0.2,
  },
  {
    key: "communities",
    title: "Empower Communities",
    subtitle: "Technology for Good",
    description: "Uplifting underserved communities through digital innovation",
    icon: <FaUsersGear className='w-10 h-10'/>,
    delay: 0.4,
  },
  {
    key: "collaboration",
    title: "Transform Collaboration",
    subtitle: "Sustainable Partnerships",
    description: "Fostering connections that help people learn, work, and thrive",
    icon: <Rocket className='w-10 h-10'/>,
    delay: 0.6,
  },
];

// --------------------------------------
// Components
// --------------------------------------

export default function Features() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change",(latest) => {
      const progress = Math.max(0, Math.min(1, (latest - 0.1) / 0.8));
      setScrollProgress(progress);

      const featureIndex = Math.floor(progress * features.length);
      const clampedIndex = Math.max(0, Math.min(features.length - 1, featureIndex));
      setCurrentFeature(clampedIndex);
    });

    return unsubscribe;
  }, [smoothProgress]);

  const featureProgress = (scrollProgress * features.length) % 1;

  return (
    <section ref={containerRef} className="relative  text-white mb-10">
      {/* ----------------- Vision Header ----------------- */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        <BackgroundLines />
        <div className="relative z-10 max-w-7xl mx-auto">
          <VisionHeader />
          <VisionGrid />
          <CallToAction />
        </div>
      </div>

      
      
      
    </section>
  );
}

// ---------------- Sub Components ----------------

function BackgroundLines() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-20 bg-linear-to-b from-transparent via-white/20 to-transparent"
          style={{ left: `${20 + i * 10}%`, top: '20%' }}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function VisionHeader() {
  return (
    <motion.div
      className="text-center mb-20"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h2
        className="text-5xl md:text-8xl font-bold mb-4 leading-tight"
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Our{" "}
        <motion.span
          className="inline-block bg-linear-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        >
          Vision
        </motion.span>
      </motion.h2>
    </motion.div>
  );
}

function VisionGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {visionBlocks.map((block) => (
        <motion.div
          key={block.key}
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: block.delay,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { duration: 0.3 },
          }}
          className="group relative"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500" />
          <div className="relative p-8 lg:p-10">
            <motion.div
              className="text-6xl mb-6 text-center lg:text-left"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {block.icon}
            </motion.div>

            <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-center lg:text-left">
              {block.title}
            </h3>
            <p className="text-lg text-gray-300 mb-4 font-medium text-center lg:text-left">
              {block.subtitle}
            </p>
            <p className="text-gray-400 leading-relaxed text-center lg:text-left">
              {block.description}
            </p>

            <motion.div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CallToAction() {
  return (
    <motion.div
      className="text-center mt-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center space-x-3 px-6 py-3 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm"
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-lg font-medium">Join the Movement</span>
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowRight className="rotate-90" size={20} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
