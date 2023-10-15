import { FC } from 'react';
import Container from './components/Container/Container';
import SearchBar from './components/SearchBar/SearchBar';
import Title from './components/Title';
import Movies from './components/Movies/Movies';
import Pagination from './components/Pagination/Pagination';
import { MovieSearchProvider } from './context/MovieSearchContext.jsx'
import './App.css'


const App: FC = () => {
  return (
    <MovieSearchProvider>
      <Container>
        <SearchBar />
        <Title />
        <Pagination />
        <Movies />
      </Container>
    </MovieSearchProvider>
  );
}
export default App;
