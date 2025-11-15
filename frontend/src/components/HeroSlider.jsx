import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const slides = [
    {
      image: "/images/ddd1.jpg",
      title: "Voyagez avec confort et sécurité",
      desc: "Des bus modernes, climatisés et connectés à Dakar Dem Dikk.",
    },
    {
      image: "/images/aibd.jpg",
      title: "Ligne Express AIBD",
      desc: "Rejoignez l’aéroport en toute tranquillité et à l’heure.",
    },
    {
      image: "/images/ddd2.jpg",
      title: "Partout à Dakar",
      desc: "Un réseau de transport intelligent au service des Dakarois.",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-[85vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[85vh] bg-cover bg-center flex flex-col justify-center items-center text-white relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 text-center max-w-3xl">
                <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg opacity-90">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
