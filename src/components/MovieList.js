import Movie from './Movie';
import './MovieList.css';

function MovieList(props){
    const {films = []} = props;
    return(
        <div className="movies">
            {
                films.length ? films.map(film => {
                    return <Movie key={film.imdbID}{...film} /> //imdbID это ключ из подгружаемого по ссылке массива с данными; film это элемент который будет обходить в цикле массив объектов и все данные собирать в себя, и передавать в компонент Movie
                }) : <h2>Nothing found</h2>
            }
        </div>
    )
}

export default MovieList;