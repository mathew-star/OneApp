'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaXTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useState } from 'react';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: '', icon: FaXTwitter },
  { name: 'LinkedIn', href: '', icon: FaLinkedin },
  { name: 'GitHub', href: '', icon: FaGithub },
  { name: 'Instagram', href: '', icon: FaInstagram },
];

export default function Footer() {
  const [showDock, setShowDock] = useState(false);

  return (
    <footer className="bg-black/25 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-4">
                OneApp
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming how people connect, collaborate, and create in the digital age.
              </p>
            </motion.div>
          </div>

          {/* Quick Links Hover Area */}
          <div className="flex items-start justify-start md:justify-end">
            <div 
              className="relative"
              onMouseEnter={() => setShowDock(true)}
              onMouseLeave={() => setShowDock(false)}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="cursor-pointer"
              >
                <h3 className="text-white font-semibold mb-2 hover:text-gray-300 transition-colors">
                  Quick Links
                </h3>
                <p className="text-gray-500 text-sm">Hover to connect</p>
              </motion.div>

              {/* Dock Component */}
              <AnimatePresence>
                {showDock && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 mt-4 right-0 md:right-auto md:left-0  z-50"
                  >
                    <Dock direction="middle" className="bg-black/80 backdrop-blur-md border border-white/20">
                      {socialLinks.map((link) => (
                        <DockIcon key={link.name}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-all duration-300 group"
                            aria-label={link.name}
                          >
                            <link.icon className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                          </a>
                        </DockIcon>
                      ))}
                    </Dock>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-center sm:text-left text-sm">
            © {new Date().getFullYear()} OneApp. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}