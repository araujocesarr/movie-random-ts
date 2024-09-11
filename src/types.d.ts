export interface MovieData {
  title: string;
  overview: string;
  year: number | null;
  rating: number;
  poster: string | null;
  duration: string | null;
}

export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface LoadingButtonProps {
  label: string;
  isLoading: boolean;
  onClick: () => void;
}

interface SwiperComponentProps {
  onLoadComplete: () => void;
  reloadTrigger: number;
}

interface HeaderProps {
  title: string;
  color: string;
  author: string;
  authorLink: string;
}
