'use client';


import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';
import { Globe, Users, Heart, Zap, LucideIcon } from 'lucide-react';

// ScrollStackItem Component
interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-auto min-h-[400px] my-8 p-8 md:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

// ScrollStack Component
interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scroller = scrollerRef.current;
    if (!scroller) {
      isUpdatingRef.current = false;
      return;
    }

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].offsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    updateCardTransforms();

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    handleScroll,
    updateCardTransforms
  ]);

  return (
    <div
      className={`relative w-full h-screen overflow-y-auto overflow-x-hidden ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-4 md:px-8 lg:px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

// Mission Card Component
interface MissionPoint {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  color: string;
  gradient: string;
}

interface MissionCardProps {
  mission: MissionPoint;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const Icon = mission.icon;
  
  return (
    <ScrollStackItem itemClassName={`bg-gradient-to-br ${mission.gradient} backdrop-blur-sm border border-white/10`}>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${mission.color} mb-6`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {mission.title}
          </h3>
          
          <p className="text-lg text-gray-300 mb-6">
            {mission.description}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          <p className="text-gray-200 leading-relaxed">
            {mission.detail}
          </p>
        </div>
      </div>
    </ScrollStackItem>
  );
};

// Main Component
const MissionScrollStack = () => {
  const missionPoints: MissionPoint[] = [
    {
      id: 1,
      icon: Globe,
      title: 'Build Digital Ecosystem',
      description: 'Creating one platform that brings together learning, working, business, and collaboration.',
      detail: 'We are dedicated to building an all-in-one platform that fosters meaningful connections and transforms how individuals learn, work, and collaborate, driving personal and collective growth.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-slate-900/90 to-slate-800/90',
    },
    {
      id: 2,
      icon: Users,
      title: 'Unlock Opportunities',
      description: 'Empowering users to be the agents for unlocking boundless opportunities for every individual.',
      detail: 'Removing barriers that prevent talented individuals from reaching their potential by unleashing opportunities for every individual through a unified ecosystem.',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-slate-900/90 to-slate-800/90',
    },
    {
      id: 3,
      icon: Heart,
      title: 'Empower Thriving Communities',
      description: 'Uplifting communities through accessible and impactful technology solutions.',
      detail: 'Building vital bridges to connect essential resources with those who need them most, empowering users to become agents of opportunity within their communities.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-slate-900/90 to-slate-800/90',
    },
    {
      id: 4,
      icon: Zap,
      title: 'Catalyze Collaborative Growth',
      description: 'Fostering dynamic and sustainable partnerships that empower individuals to learn, work, and thrive.',
      detail: 'Cultivating lasting connections that generate mutual benefits for individuals and the communities they belong to, building a unified and sustainable digital ecosystem.',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-slate-900/90 to-slate-800/90',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-10 px-4 md:px-8 lg:px-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-gray-400">
            Scroll to explore how we're transforming the digital landscape
          </p>
        </div>
      </div>

      {/* Scroll Stack Section */}
      <ScrollStack
        itemDistance={150}
        itemScale={0.04}
        itemStackDistance={40}
        stackPosition="25%"
        scaleEndPosition="15%"
        baseScale={0.9}
        blurAmount={2}
      >
        {missionPoints.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </ScrollStack>
    </div>
  );
};

export default MissionScrollStack;