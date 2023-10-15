import style from './Pagination.module.css'

interface NavButtonProps {
  text: string;
  onClickButton: () => void;
};


const NavButton = ( { 
  text,
  onClickButton  
}: NavButtonProps) => {
  return (
    <button className={style.btn} onClick={onClickButton}>{text}</button>
  );
}

export default NavButton;