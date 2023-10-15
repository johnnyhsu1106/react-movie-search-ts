import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { IMovie, IMoviesData } from '../types/interfaces';

interface IMovieSearchContext {
  query: string;
  movies: IMovie[];
  currPageNum: number;
  currBucket: number;
  lastBucket: number;
  numOfPages: number;
  numOfResults: number;
  isLoading: boolean;
  isError: boolean;
  PAGE_PER_BUCKET: number;
  handleSearchQuery: (query: string) => void;
  handleNavButtonClick: (increment: number, lastpageNum: number) => void;
  handlePageNumClick: (pageNum: number) => void;
};

interface IRequestOption {
  method: string;
    headers: {
        accept: string;
        Authorization: string;
    };
    signal: AbortSignal;
}

interface MovieSearchProviderProps {
  children: ReactNode;
};

const API_ENDPOINT: string = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN: string = import.meta.env.VITE_MOVIE_API_TOKEN; // import the api token from env.local
const PAGE_PER_BUCKET: number = 10;

const MovieSearchContext = createContext<IMovieSearchContext | undefined>(undefined);

const useMovieSearchContext = (): IMovieSearchContext => {
  const movieSearchContext = useContext(MovieSearchContext);

  if (movieSearchContext === undefined) {
    throw new Error('useMovieSearchContext must be used within a MovieSearchProvider');

  }
  return movieSearchContext; 
};

const MovieSearchProvider = ({ children }: MovieSearchProviderProps) => {
  const [query, setQuery] = useState<string>('');
  const [currPageNum, setCurrPageNum] = useState<number>(0);
  const [data, setData] = useState<IMoviesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const numOfPages: number = data?.total_pages || 0; 
  const numOfResults: number = data?.total_results || 0;
  const movies: IMovie[] = data?.results?.map((result) => { return result }) || [];
  const currBucket: number = currPageNum !== 0 ? Math.floor((currPageNum - 1) / PAGE_PER_BUCKET) + 1 : 0;
  const lastBucket: number = numOfPages !== undefined ? Math.floor((numOfPages - 1) / PAGE_PER_BUCKET) + 1 : 0;

  useEffect(() => {
    if (currPageNum === 0) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    const controller: AbortController = new AbortController();
    const options: IRequestOption  = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
      },
      signal: controller.signal
    };

    fetch(`${API_ENDPOINT}?query=${query}&page=${currPageNum}`, options)
    .then((res: Response): Promise<IMoviesData> => {
      if (!res.ok) {
        throw new Error('Invalid HTTPS Request');
      }
      return res.json();

    }).then((data: IMoviesData) => {      
      setIsLoading(false);
      setData(data);
  
    }).catch((err) => {
      if (err.name === 'AbortError') {
        return;
      }
      setIsError(true);

    }).finally(() => {
      setIsLoading(false);
    });

    return () => {
      controller.abort();
    }

  }, [query, currPageNum]);


  const handleSearchQuery = (query: string): void => {
    setQuery(query);
    setCurrPageNum(1);
  };

  const handleNavButtonClick = (increment: number, lastpageNum: number): void => {
    setCurrPageNum((prevpageNum) => {
      return prevpageNum + increment === lastpageNum ? lastpageNum : prevpageNum + increment;
    });
  };

  const handlePageNumClick = (pageNum: number): void => {
    setCurrPageNum(pageNum);
  };

  const value: IMovieSearchContext = {
    query,
    movies,
    currPageNum,
    currBucket,
    lastBucket,
    numOfPages,
    numOfResults,
    isLoading,
    isError,
    PAGE_PER_BUCKET,
    handleSearchQuery,
    handleNavButtonClick,
    handlePageNumClick
  };

  return (
    <MovieSearchContext.Provider value={value}>
      {children}
    </MovieSearchContext.Provider>
  )
}

export { useMovieSearchContext, MovieSearchProvider };