import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { MovieData } from "../types";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

interface CardProps {
  data: MovieData;
}
export const Card: React.FC<CardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("6rem");
  const [isTruncated, setIsTruncated] = useState(false);

  const contentRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("7.5rem");
      }
      setIsTruncated(data.overview.length > 100);
    }
  }, [isExpanded, data.overview]);

  const getExcerpt = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsExpanded(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <div
      className="p-6 bg-gray-100 max-w-sm mx-auto rounded-3xl drop-shadow-lg shadow-md 
    xl:max-w-2xl"
      ref={cardRef}
    >
      {data.poster ? (
        <img
          src={data.poster}
          alt={`${data.title}`}
          className="rounded-xl aspect-[4/5]"
        />
      ) : (
        <img
          src="https://placehold.co/500x750?text=Poster+Not+Available"
          alt="image-doesnt-exist"
          className="rounded-xl"
        />
      )}

      <h1 className="font-bold text-xl my-4">{data.title}</h1>
      <p
        ref={contentRef}
        className={`font-normal text-gray-900 border-t border-gray-300 pt-4 pb-1 overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight }}
      >
        {isExpanded ? data.overview : getExcerpt(data.overview, 100)}
      </p>
      {isTruncated && (
        <button
          className="text-blue-500 cursor-default p-1 flex justify-center items-center w-full mb-3 pt-3
          "
        >
          <FontAwesomeIcon
            onClick={toggleExpand}
            icon={isExpanded ? faArrowUp : faArrowDown}
            className="px-4 cursor-pointer"
          />
        </button>
      )}

      <div className="flex gap-5 border-t border-gray-300 pt-4">
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} className="text-stone-500" />
          <p className="font-normal text-gray-900">
            {data.year ? data.year : "N/A"}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <p className="text-gray-900">
            {isNaN(data.rating) ? "N/A" : data.rating}
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="text-stone-500" />
          <p className="text-gray-900">
            {data.duration ? data.duration : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
