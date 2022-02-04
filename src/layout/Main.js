import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component {
    state = {
        films: [],
        loading: true
    }

    componentDidMount() {  //срабатывает после загрузки страницы
        fetch('https://www.omdbapi.com/?apikey=f00c6d83&s=matrix') //для удобства и читабельности, содержимое подгруженное по ссылке выше нужно скопировать и перенести в json editor online;
            .then(response => response.json()) //здесь данные которые загружаются по ссылке, сохраняются в переменную response и с помощью response.json преобразуются в объект json (JS?)
            .then(data => this.setState({ films: data.Search, loading: false }))  //ключ search получен из объекта подгруженного по ссылке; здесь содержимое подгруженное по ссылке выше и преобразованное в объект json (JS?) мы сохраняем в массив films, который мы создавали изначально пустым; после того как страница загрузилась значение переменной loading меняем на false, т.к. загрузка окончена
    }

    searchMovies = (str, type = "all") => {
        this.setState({loading: true}) //при активации функции searchMovies снова меняем значение loading на true, т.к. происходит подгрузка данных
        fetch(`https://www.omdbapi.com/?apikey=f00c6d83&s=${str}${type !== 'all' ? `&type=${type}` : ''}`) //${type !== 'all' ? '&type=${type}' : ''} - если type не равен all (не выбрана радио кнопка со значением All(кнопки прописаны в Search.js)), то к ссылке добавляется type со значением, которое передается в зависмости от нажатой радио кнопки, если нет (т.е. если type = all), то к ссылке ничего не добавляется (фактически в коде мы не можем оставить пустое место в тернарном операторе после ":", поэтому пишем '' что эквиваленто пустому месту)
            .then(response => response.json())
            .then(data => this.setState({ films: data.Search, loading: false })) //по окончании функции searchMovies вновь меняем loading на false
    }

    render() {
        const { films, loading } = this.state;
        return (
            <div className='main'>
                <div className="wrap">
                    <Search searchMovies={this.searchMovies}/>
                    {
                        loading === false ? <MovieList films={films} /> : <Preloader />
                        //это проверка на то, загрузилось ли в массив films содержимое по ссылке выше; читается как "если загрузка окончена то отображать компонент MovieList, если же нет (загрузка идет (loading = true)), то отображать компонент Preloader"
                    }
                </div>
            </div>
        )
    }
}

export default Main;