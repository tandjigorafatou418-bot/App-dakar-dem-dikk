import React, { useState, useEffect } from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";


export default function SocialMediaSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/dakardemdikk',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/dakardemdikk',
      color: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/dakardemdikk',
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/dakardemdikk',
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@dakardemdikk',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@dakardemdikk',
      color: 'bg-black hover:bg-gray-900'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Cache quand on descend, montre quand on monte
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Version Desktop - côté droit */}
      <div
        className={`hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              title={social.name}
            >
              {/* Bulle avec nom (apparaît au hover) */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl">
                {social.name}
                {/* Flèche pointant vers l'icône */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-gray-900 ml-[-1px]"></div>
              </div>

              {/* Icône sociale */}
              <div
                className={`${social.color} text-white p-3.5 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${
                  index === 0 ? 'rounded-tl-xl' : ''
                } ${index === socialLinks.length - 1 ? 'rounded-bl-xl' : ''}`}
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Icon className="w-5 h-5" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Version Mobile - en bas */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl transition-all duration-500 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-around items-center px-2 py-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300`}
                title={social.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
        <div className="text-center text-xs text-gray-500 pb-2 font-medium">
          Suivez-nous sur les réseaux sociaux
        </div>
      </div>
    </>
  );
}