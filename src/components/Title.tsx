import { useMovieSearchContext } from '../context/MovieSearchContext';


const Title = () => {
  const { 
    query,
    numOfResults, 
  } = useMovieSearchContext();

  if (numOfResults === undefined) {
    return null;
  }

  return (
    <>
      <h2>{query}</h2>
      <p> {numOfResults > 0 ? `${numOfResults} movies found` : 'No Found'}</p>
    </>
  )
}

export default Title;
