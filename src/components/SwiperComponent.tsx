import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { Card } from "./Card";
import { MovieData, SwiperComponentProps } from "../types";
import { fetchRandomMovies } from "../services";
import { SwiperClass } from "swiper/react";
import { LoadingCard } from "./LoadingCard";

export const SwiperComponent: React.FC<SwiperComponentProps> = ({
  onLoadComplete,
  reloadTrigger,
}) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(true);
    const movieData = await fetchRandomMovies();
    setMovies(movieData);
    setIsLoading(false);
    onLoadComplete();
    if (swiperRef.current) {
      swiperRef.current.update();
    }
    console.log(movies);
  };

  useEffect(() => {
    getMovies();
  }, [reloadTrigger]);

  return (
    <div className="transition-all duration-1000">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: true }}
        navigation={true}
        scrollbar={{ draggable: true }}
        slidesPerView={1.1}
        slidesPerGroup={1}
        centeredSlides={true}
        modules={[Pagination, Navigation]}
        className="w-11/12 2xl:max-w-[1400px]"
        loop={true}
        breakpoints={{
          512: {
            slidesPerView: 1.2,
            spaceBetween: 10,
            slidesPerGroup: 1,
            centeredSlides: true,
          },
          640: {
            slidesPerGroup: 2,
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: false,
          },
          1024: {
            slidesPerGroup: 3,
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 10,
            allowTouchMove: false,
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <SwiperSlide key={index} style={{ padding: ".5rem" }}>
                <LoadingCard />
              </SwiperSlide>
            ))
          : movies.map((movie, index) => (
              <SwiperSlide key={index} style={{ padding: ".5rem" }}>
                {movie ? <Card data={movie} /> : <LoadingCard />}
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
