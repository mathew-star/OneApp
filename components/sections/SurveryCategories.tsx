"use client";

import React, { useState, useEffect,ReactNode } from 'react';
import { ChevronRight, Globe, Users, Zap, Star, ArrowRight, Menu, X, Twitter, Github, Linkedin } from 'lucide-react';
import { SurveyCard } from "@/components/SurveyCard";
import { SurveyCategory } from '@/types';




const SURVEY_CATEGORIES: SurveyCategory[] = [
  {
    title: "Students",
    subtitle: "Ages 16–19",
    icon: "🎓",
    description: "Share your learning experiences and networking needs",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSePq86AP4ppZlG88neh9FdDc2twvp2u7LgZzgLfyBKevUkQig/viewform",
  },
  {
    title: "Professional Students",
    subtitle: "Pursuing Degrees",
    icon: "📚",
    description: "Tell us about your academic and career goals",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfrEq0aRKv1GBcC_sybcZuURcOtvMUl-91FE_yRuNtH3xgMtg/viewform",
  },
  {
    title: "Working Professionals",
    subtitle: "Employed Workforce",
    icon: "💼",
    description: "Help us understand your professional networking needs",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScV-NoWYDRtQusoElx80dD5jww8Dbt6fDhYQsr7l7OmaD8miQ/viewform",
  },
  {
    title: "Business Owners",
    subtitle: "Entrepreneurs & Startups",
    icon: "🚀",
    description: "Share insights on collaboration and growth opportunities",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScw6cR89CCqsZOtGTObE81frfzcyRvr1xnEhR7fezeMPUZjmg/viewform",
  },
];


const Survery:React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e:MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

interface AnimatedTextProps {
    text: ReactNode;
    className?: string;
    delay?: number;
  }




  const AnimatedText:React.FC<AnimatedTextProps>=({
    text,
    className="",
    delay=0,
  }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
        {text}
      </div>
    );
  };

    interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
  }


const handletouch=()=>{
  console.log("touched . . .")
}



  return (
    <div className=" text-white min-h-screen overflow-x-hidden">

    

      {/* Survey Section */}
      <section id="survey" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r text-white bg-clip-text ">
              Help Shape OneApp
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your insights matter! Take a quick survey tailored to your profile and help us build 
              the perfect platform for your needs.
            </p>
          </div>

          

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SURVEY_CATEGORIES.map((category) => (
              <SurveyCard key={category.title} category={category} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              ⏱️ Each survey takes approximately 3-5 minutes to complete
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white bg-clip-text ">
            Join the Revolution
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Be part of a community that's reshaping the future of work, learning, and connection. 
            Together, we're building something extraordinary.
          </p>

          

          
            <div className="w-full text-center p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to Transform Your Network?</h3>
              <p className="text-gray-300 mb-6">Join thousands of innovators, creators, and professionals who are already building the future.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <button className="bg-gradient-to-r from-white to-gray-300 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span className='text-black'>Join Beta Waitlist</span>
                  <ChevronRight className="w-5 h-5" />
                </button> */}


               
                    <button
                    onClick={() => handletouch()}
                    
                    className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
                    >
                    <span
                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
                    ></span>

                    <span
                        className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
                    ></span>

                    <div
                        className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#4d78b9] via-[#8aa7ce] to-[#93b1c2] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
                    >
                        <span className="select-none">Join Beta Waitlist</span>

                        <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
                        >
                        <path
                            clipRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            fillRule="evenodd"
                        ></path>
                        </svg>
                    </div>
                    </button>




                <button className="px-8 py-3 rounded-full text-lg font-medium border border-gray-600 hover:border-white hover:bg-gray-900 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          
        </div>
      </section>


    </div>
  );
};

export default Survery;