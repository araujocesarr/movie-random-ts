import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faStar,
} from "@fortawesome/free-regular-svg-icons";

export const LoadingCard: React.FC = () => {
  return (
    <div
      className="p-6 bg-gray-100 max-w-sm mx-auto rounded-3xl drop-shadow-lg shadow-md 
        xl:max-w-2xl animate-pulse-fast"
    >
      <div className="rounded-xl bg-gray-300 h-96 w-full mb-4 animate-pulse"></div>
      <h1 className="font-bold text-xl my-4 bg-gray-300 h-6 w-3/4 rounded"></h1>
      <p className="font-normal text-gray-900 mb-4 border-t border-gray-300 pt-4 bg-gray-300 h-4 w-full rounded"></p>
      <div className="flex gap-5 border-t border-gray-300 pt-4">
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} className="text-stone-500" />
          <p className="font-normal text-gray-300 bg-gray-300 h-4 w-12 rounded"></p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <p className="text-gray-300 bg-gray-300 h-4 w-12 rounded"></p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="text-stone-500" />
          <p className="text-gray-300 bg-gray-300 h-4 w-12 rounded"></p>
        </div>
      </div>
    </div>
  );
};
