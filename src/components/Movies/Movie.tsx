import style from './Movies.module.css';
import notAvailableImage from '/images/no_image_available.jpeg';
import { IMovie } from '../../types/interfaces';

const BACKDROP_BASE_URL: string = 'https://www.themoviedb.org/t/p/original';

interface MovieProps {
  movie: IMovie;
};

const Movie = ({ movie }: MovieProps) => {
  const {
    title, 
    backdrop_path, 
    release_date
  } = movie; 
  
  const imgSrc = backdrop_path !== null ? `${BACKDROP_BASE_URL}${backdrop_path}` : notAvailableImage;
  
  return (
    <div className={style.movie}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.date}> Release Date:  <time dateTime={release_date}>{release_date}</time></p>
      <img className={style.backdrop} src={imgSrc} alt={title} />
    </div>
  );
}

export default Movie;