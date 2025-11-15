import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Pause, Play } from 'lucide-react';

export default function NewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&h=600&fit=crop',
      title: 'Nos offres d\'abonnements Dem Dikk',
      description: 'Élèves-Étudiants 10 000 Fcfa/Mois • Enfants de Fonctionnaire 4 000 Fcfa/Mois • Fonctionnaires 8 000 Fcfa/Mois',
      badge: 'Promo',
      color: 'emerald'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1400&h=600&fit=crop',
      title: 'L\'Afrique accueille, Dakar célèbre...',
      description: 'Dem Dikk transporte - Bienvenue à AYO, mascotte officielle des JOJ Dakar 2026',
      badge: 'Actualité',
      color: 'blue'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&h=600&fit=crop',
      title: 'RENTRÉE DES CLASSES',
      description: 'Abonnez-vous et voyagez en illimité. Prenez le bon départ avec Dem Dikk !',
      badge: 'Promotion',
      color: 'teal'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&h=600&fit=crop',
      title: 'Déplacez-vous partout à Dakar !',
      description: 'Nouveau réseau de transport urbain. DemDikk, Encore plus proche de vous !',
      badge: 'Service',
      color: 'amber'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const badgeColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    teal: 'bg-teal-500',
    amber: 'bg-amber-500'
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Barre d'alerte info en haut */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="bg-white text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            Alerte info
          </span>
          <p className="text-sm font-medium">
            Nouveau réseau de transport urbain. Pour plus d'information 33 824 10 10 / serviceclient@demdikk.sn
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={isPaused ? 'Reprendre' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button className="p-1 hover:bg-white/20 rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider principal */}
      <div className="relative h-[400px] md:h-[500px] group">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image de fond */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            
            {/* Contenu */}
            <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className={`inline-block ${badgeColors[slide.color]} text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg`}>
                  {slide.badge}
                </div>
                
                {/* Titre */}
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-500 ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  {slide.title}
                </h2>
                
                {/* Description */}
                <p className={`text-base md:text-lg text-white/90 leading-relaxed transition-all duration-500 delay-200 ${
                  index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  {slide.description}
                </p>
              </div>
            </div>

            {/* Logo Dem Dikk (optionnel) */}
            <div className="absolute top-4 left-6 md:left-12">
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-emerald-600 font-bold text-lg">🚌 Dem Dikk</span>
              </div>
            </div>
          </div>
        ))}

        {/* Flèches de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Points de navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-12 h-3'
                  : 'bg-white/60 hover:bg-white/80 w-3 h-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}