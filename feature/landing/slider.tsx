"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Test1 from "/public/img/test1.jpeg";
import Test2 from "/public/img/test2.jpeg";
import Test3 from "/public/img/test3.jpeg";

interface HeroSlide {
  id: number;
  image: StaticImageData;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: Test1,
  },
  {
    id: 2,
    image: Test2,
  },
  {
    id: 3,
    image: Test3,
  },
];

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setPage(([currentPage]) => [(currentPage + 1) % slides.length, 1]);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isDragging]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setPage(([currentPage]) => {
      const nextPage =
        (currentPage + newDirection + slides.length) % slides.length;
      return [nextPage, newDirection];
    });
  };

  return (
    <div className="relative h-[326px] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          //   dragConstraints={false}
          dragElastic={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, { offset, velocity }) => {
            setIsDragging(false);
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[page].image}
            alt={""}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-4 bottom-4">
            <h1 className="whitespace-pre-line text-lg font-bold text-white">
              {""}
            </h1>
            <p className="mt-1 text-sm text-white">{""}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicator */}
      <div className="absolute right-2 top-[280px] z-10 flex h-[20px] w-[52px] items-center justify-center rounded-full bg-black/50">
        <span className="text-xs text-white">
          {page + 1}/{slides.length}
        </span>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-2 flex space-x-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`size-2 rounded-full transition-colors ${
              index === page ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
