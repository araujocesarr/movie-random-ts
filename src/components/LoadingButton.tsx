import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { LoadingButtonProps } from "../types";

const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  isLoading,
  onClick,
}) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`px-4 py-2 transition-all duration-200 bg-gradient-to-r from-indigo-500 to-blue-700 text-white cursor-pointer text-lg rounded-lg ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-all duration-500 ease-in-out transform hover:scale-105"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <h1>Loading...</h1>
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : (
          label
        )}
      </button>
    </div>
  );
};
export default LoadingButton;
