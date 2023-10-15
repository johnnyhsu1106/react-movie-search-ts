export interface IMovie {
  id: number;
  title: string;
  backdrop_path: string; 
  release_date: string;
};

export interface IMoviesData {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
};