import React from "react";
import { HeaderProps } from "../types";

export const Header: React.FC<HeaderProps> = ({
  title,
  color,
  author,
  authorLink,
}) => {
  return (
    <div>
      <h1
        className={`text-center text-3xl font-bold font-mono pt-4 pb-1`}
        style={{ color: color }}
      >
        {title}
      </h1>
      <a
        href={authorLink}
        className=" hover:text-blue-700 hover:text-lg text-xs transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <h2 className="mb-2 text-center">by {author}</h2>
      </a>
    </div>
  );
};
