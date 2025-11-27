import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import samsung from "../assets/samsung.jpg";
import dumbbell from "../assets/dumbbell.webp";
import shoe from "../assets/shoe.jpeg";
import { AuthContext } from "../context/AuthContext";

const images = [samsung, dumbbell, shoe];

const SquarePopSlider = () => {
  const imageRefs = useRef([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const imgs = imageRefs.current;

    // initial layout: left, center, right
    const positions = [
      { x: -180, scale: 0.8, opacity: 0.5, zIndex: 1 },
      { x: 0, scale: 1, opacity: 1, zIndex: 3 },
      { x: 180, scale: 0.8, opacity: 0.5, zIndex: 1 },
    ];

    gsap.set(imgs, {
      position: "absolute",
      top: "50%",
      left: "50%",
      yPercent: -50,
      xPercent: -50,
    });
    imgs.forEach((img, i) => gsap.set(img, positions[i]));

    let index = 0;
    const total = imgs.length;

    const rotate = () => {
      const nextIndex = (index + 1) % total;
      const prevIndex = (index + 2) % total;

      // Animate to new positions (left → center → right)
      gsap.to(imgs[index], {
        ...positions[0],
        duration: 1.5,
        ease: "power3.inOut",
      });
      gsap.to(imgs[nextIndex], {
        ...positions[1],
        duration: 1.5,
        ease: "power3.inOut",
      });
      gsap.to(imgs[prevIndex], {
        ...positions[2],
        duration: 1.5,
        ease: "power3.inOut",
      });

      index = nextIndex;
    };

    const interval = setInterval(rotate, 2000); // 👈 slower & smooth
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden py-[140px] px-6 md:px-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto relative">
        {/* ---------- LEFT TEXT SECTION ---------- */}
        <div className="lg:w-1/2 text-center lg:text-left px-4 lg:px-0 z-10">
          {user && (
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 mb-3">
              Welcome back, {user.name}!
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight">
            Explore Our Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Smooth, minimal animations and a modern, responsive layout for every
            device.
          </p>
          <button className="px-6 sm:px-8 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </div>

        {/* ---------- RIGHT IMAGE ROTATION SECTION ---------- */}
        <div className="lg:w-1/2 relative w-full h-[300px] flex items-center justify-center">
          {images.map((src, i) => (
            <img
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              src={src}
              alt={`product-${i}`}
              className="rounded-2xl object-cover shadow-xl w-[160px]  h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] hover:shadow-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquarePopSlider;
