import Movie from './Movie';
import { useMovieSearchContext } from '../../context/MovieSearchContext';
import style from './Movies.module.css';
import Loading from '../Loading';
import Error from '../Error';


const Movies = () => {
  const {
    isLoading,
    isError, 
    movies 
  } = useMovieSearchContext();

  if (isLoading) {
    return <Loading />;
  } 
  
  if (isError) {
    return <Error />;
  }
  
  return (
    <div className={style['movie-list']}>
      {movies.map((movie) => {
        const { id } = movie;
          return <Movie key={id} movie={movie} />
        })}
    </div>
  )
};

export default Movies;