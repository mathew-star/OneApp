'use client';

import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { Globe } from '@/components/ui/globe';
import { ChevronDown } from 'lucide-react';

export default function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  // Smooth spring animation for mouse movement
  const springConfig = { stiffness: 300, damping: 30 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 25;
    const y = (clientY - innerHeight / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-gray-950"
      aria-label="Hero section"
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:14px_24px]"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div 
        className="absolute inset-0 bg-linear-to-b from-gray-950/50 via-gray-950/30 to-gray-950/50"
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale, rotateX }}
        className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Left content */}
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="relative text-left space-y-6 lg:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 glass-dark px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                The Future of Social Networking
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 animate-gradient-x">
                OneApp
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-xl leading-relaxed"
            >
              Connect, collaborate, and create in a unified digital ecosystem
              designed for the modern world.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                className="rounded-full p-3 border border-amber-50 group relative overflow-hidden"
                aria-label="Get started with OneApp"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* <button
                className="btn-outline rounded-full p-3 border border-amber-50 group relative overflow-hidden"
                aria-label="Learn more about OneApp"
              >
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button> */}
            </motion.div>

            {/* Stats or features (optional) */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">10M+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">150+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right content - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe />
            </div>

            {/* Decorative glow around the globe */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent rounded-full blur-3xl"
              aria-hidden="true"
            />

            {/* Rotating ring effect */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-2xl"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

    </section>
  );
}