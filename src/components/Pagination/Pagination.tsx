import { useMovieSearchContext } from '../../context/MovieSearchContext';
import  NavButton from './NavButton';
import PageLinks from './PageLinks';
import style from './Pagination.module.css';


const Pagination = () => {
  const {
    currPageNum,
    numOfPages,
    numOfResults,
    handleNavButtonClick
  } = useMovieSearchContext();

  if (numOfResults === undefined) {
    return null;
  }

  return (
    <>
      <PageLinks />
      <div className={style['nav-btns']}>
        {currPageNum > 1 && 
          <NavButton
            text='Prev Page' 
            onClickButton={() => { handleNavButtonClick(-1, 1) }} 
          />
        }
        {currPageNum < numOfPages && 
          <NavButton
            text='Next Page' 
            onClickButton={() => { handleNavButtonClick(1, numOfPages) }} 
          />}
      </div>
    </>
  )
}

export default Pagination