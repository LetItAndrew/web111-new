import React from "react";
import './Search.css';

class Search extends React.Component {
    state = {
        search: "",
        type: "all" //это наш фильтр для поиска, по умолчанию ставим значение All
    }

    handlerKey = (event) => {
        if(event.key === "Enter"){
            this.props.searchMovies(this.state.search, this.state.type);
            //handlerKey - рандомное название, функция располагается в input, ниже по коду, вызывается атрибутом onKeyDown; читается как "если в поле input с классом search нажата кнопка Enter, то вызывается функция searchMovies (прописана в Main), а содержимое поля (которое было записано в переменную search массива state (стр 31)) передается (через this.state.search) в str функции searchMovies и далее в ссылку с подгружаемыми данными внутри этой функции (см Main)"
        }
    }

    handlerFilter = (event) => {
        this.setState(() => ({type: event.target.dataset.one}), () => { //target - это та радио кнопка (по коду ниже) которая вызвала функцию handlerFilter, т.е. говорит о том, что именно ее значение атрибута data-one будет записано в переменную type
            this.props.searchMovies(this.state.search, this.state.type);
        }) //dataset.one - устанавливает пользовательский атрибут data-one (по коду ниже); здесь мы записываем в переменную type из массива state значение атрибута data-one нажатой радио кнопки (которая и запустила событие handlerFilter (кнопки по коду ниже)), далее запускается стрелочная функция по аналогии с функцией выше - handlerKey (строка скопирована оттуда)

        //нахрена выше стоит event если уже есть target?
    }

    render() {
        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="search"
                        value={this.state.search}  //то что введет пользователь, будет сохранено в this.state.search
                        onChange={(event) => this.setState({ search: event.target.value })}  //введенное содержимое заменяет значение ключа search массива state, которое изначально объявлено пустым
                        onKeyDown={this.handlerKey}
                        //onKeyDown - фиксирует нажатие клавиши, и выше по коду (стр 11), проверяет: если это нажата клавиша Enter, то запускается searchMovies
                    />
                    <button 
                        className="btn"
                        onClick={() => this.props.searchMovies(this.state.search, this.state.type)} //задаем для клика по кнопке те же события что и для нажатия клавиши Enter в поле search
                    >Search</button>
                </div>
                <div className="radio">
                    <input type="radio" name="type" data-one="all" checked={this.state.type === 'all'} onChange={this.handlerFilter} /> <span>All</span>
                    <input type="radio" name="type" data-one="movie" checked={this.state.type === 'movie'} onChange={this.handlerFilter} /> <span>Movies only</span>
                    <input type="radio" name="type" data-one="series" checked={this.state.type === 'series'} onChange={this.handlerFilter} /> <span>Series only</span>
                    <input type="radio" name="type" data-one="game" checked={this.state.type === 'game'} onChange={this.handlerFilter} /> <span>Games only</span>
                    {/* помним что data- это пользовательский атрибут, а one рандомное имя */}
                </div>
            </>
        )
    }
}

export default Search;