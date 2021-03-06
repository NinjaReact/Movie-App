# Началаьная подготовка :

Удалить все файлы из папки src , кроме :

* App.js;
* index.js
* index.css

**В index.html после title добавить cdn на materializecss.com**

---

**Создаем папку layout :**

- Header.jsx
- Main.jsx
- Footer.jsx

---

**Создание Шапки**

**ctrl + h , заменить все class на className**

```JavaScript
function Header(){
    return
        <nav className='#512da8 deep-purple darken-2'>
            <div classNameName="nav-wrapper">
                <a href="#" className="brand-logo">React Movies</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://github.com/NinjaReact?tab=repositories">Github</a></li>
                </ul>
            </div>
        </nav>
}

export {Header}
```

---

**Создание подвала**

```JavaScript
function Footer(){
    return
        <footer className="page-footer #512da8 deep-purple darken-2">
            <div className="footer-copyright">
                <div className="container">
                © {new Date().getFullYear()}
                <a className="grey-text text-lighten-4 right" href="#!">Git</a>
                </div>
            </div>
        </footer>
}

export  {Footer}
```


---


**Запрос на сервер и вывод полученных карточек на экран**
*Создаем компоненты Movie(Создается div каждой карточки) и Movies(через map бегает по Movie)*

**Main.js ↓**

```javascript
import React from 'react'
import {Movies} from '../components/Movies'
import {Prealoader} from '../components/Preloader'

class Main extends React.Component{
    state = {
        movies : []
    }
    
    componentDidMount(){
        fetch('http://www.omdbapi.com/?apikey=d7b16aad&s=matrix')
            .then(response => response.json())
            .then(data => this.setState({movies : data.Search}))
    }

    render(){
        const {movies} =this.state

        return <div className='container content'>
                {
                    movies.length ? (
                        <Movies movies={movies} />   
                    ) :
                        <Prealoader />
                }
            </div>
    }
}

export {Main}
```
*Что и как работает :*

**Создаем компонент Preloader**
```javascript
function Prealoader(){
    return <div className="progress">
    <div className="indeterminate"></div>
</div>
}
export {Prealoader}
```


**Подключаем реакт и компонент Movies куда будем передавать полученный state ↓**
```javascript
import React from 'react'
import {Movies} from '../components/Movies'
```

**Делаем fetсh запрос на API с фильмами и заносим полученные объекты в state ↓** 
```javascript
    state = {
        movies : []
    }
    
    componentDidMount(){
        fetch('http://www.omdbapi.com/?apikey=d7b16aad&s=matrix')//API
            .then(response => response.json())// Из полученной строки делаем объекты
            .then(data => this.setState({movies : data.Search})) // Заносим полученный массив Search в movies
    }
```

**Передаем state в Movie и рендрим то что вернет Movie ↓**
```javascript
    render(){
        const {movies} =this.state// Диструктуризация , чтобы не писать this.state.movies

        return <div className='container content'>
                {
                    movies.length ? ( // если массив пустой то будет надпись лоадинг
                        <Movies movies={movies} />  // Передаем массив movies (при получении он будет называться movies movies={movies})
                    ) :
                        <h5>Loading..</h5>
                }
            </div>
    }
```

**Что делает и получает Movies ↓**
```javascript
import {Movie} from './Movie'

function Movies (props){
    const {movies} = props // Дистукрутризация , чтобы не писать props.movies

    return <div className='movies'>
        {movies.map(movie => {
            return <Movie key={movie.imdbID} {...movie}/>
        })}
    </div>
}
export {Movies}
```

**При создании компонентинтиков React запрашивает уникальный key для каждого компонентика key={movie.imdbID}**
**movie хранин в себе :**
* Title 
* Year
* imdbID
* Type
* Poster

**{...movie} === Title={Title} ,Year = {Year} и тд**

**Так как в movies хранятся все карточки , то в методе map , movie - объект 1 карточки**

**Чтоже делает Movies ?**

```javascript
function Movie (props){
    const {
        Title : title,
        Year : year,
        imdbID : id,
        Type :type,
        Poster : poster
    } = props

     
    return <div id={id} className="card movie">
        <div className="card-image waves-effect waves-block waves-light">
          {
            poster === 'N/A' ? 
            <img className="activator" src={`https://via.placeholder.com/300x450?text=${title}`} />
            : 
            <img className="activator" src={poster} />
          }
        </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{title}</span>
      <p>{year} <span className='right'>{type}</span></p>
    </div>
  </div>
    
}
export {Movie}
```

**Диструктуризация и меняем названия :**
```javascript
    const {
        Title : title,
        Year : year,
        imdbID : id,
        Type :type,
        Poster : poster
    } = props
```

**заполняем карточку взятую c materialize css , полученными данными (данные 1 карточки , метод map в Movies вызывает функцию Movie столько раз , сколько элементов в state) ↓**

```javascript
    return <div id={id} className="card movie">
        <div className="card-image waves-effect waves-block waves-light">
          {
            poster === 'N/A' ? 
            <img className="activator" src={`https://via.placeholder.com/300x450?text=${title}`} />
            : 
            <img className="activator" src={poster} />
          }
        </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{title}</span>
      <p>{year} <span className='right'>{type}</span></p>
    </div>
  </div>
```

---

**ПОИСК**

**Создаем компонент Search , скопированный из materialize css**
*Делаем классовый компонент , так как мы делаем поиск и работаем с state , нам нужны классовые компоненты*
```javascript
import React from 'react'

class Search extends React.Component {

    state ={
        search : ''
    }
    render(){
        return (
            <div className="row"> 
                <div className="input-field">
                    <input 
                        placeholder='search'  
                        type="search" 
                        className="validate" 
                        value={this.state.search}
                        onChange={(e) => this.setState({search : e.target.value})}
                    />
                </div>
            </div>
        )   
    }
}

export {Search} 
```
**onChange - делает колбек который вносит все что есть в инпуте в state.search**
**Value = в value инпута будет записываться то что есть в state.search**

**просто добавляем поиск в main↓**
```javascript
import React from 'react'
import {Movies} from '../components/Movies'
import {Prealoader} from '../components/Preloader'
import {Search} from '../components/Search'

class Main extends React.Component{
    state = {
        movies : []
    }
    
    componentDidMount(){
        fetch('http://www.omdbapi.com/?apikey=d7b16aad&s=matrix')
            .then(response => response.json())
            .then(data => this.setState({movies : data.Search}))
    }

    render(){
        const {movies} =this.state

        return <div className='container content'>
            <Search />
                {
                    movies.length ? (
                        <Movies movies={movies} />   
                    ) :
                        <Prealoader />
                }
            </div>
    }
}

export {Main}
```

**Для запроса на сервер с данными из seacrh мы не можем делать функцию в компоненте searh.jsx , так как он не может влиять прям на state компонента который его вызывает , нам нужно сделать функцию В Main.jsx и спустить ее в Search.jsx**

**main.jsx :**


```javascript
import React from 'react'
import {Movies} from '../components/Movies'
import {Prealoader} from '../components/Preloader'
import {Search} from '../components/Search'

class Main extends React.Component{
    state = {
        movies : []
    }
    
    componentDidMount(){
        fetch('http://www.omdbapi.com/?apikey=d7b16aad&s=matrix')
            .then(response => response.json())
            .then(data => this.setState({movies : data.Search}))
    }

    searchMovies = str => {
        fetch(`http://www.omdbapi.com/?apikey=d7b16aad&s=${str}`)
        .then(response => response.json())
        .then(data => this.setState({movies : data.Search}))
    }

    render(){
        const {movies} =this.state

        return <div className='container content'>
            <Search searchMovies = {this.searchMovies}/>
                {
                    movies.length ? (
                        <Movies movies={movies} />   
                    ) :
                        <Prealoader />
                }
            </div>
    }
}

export {Main}
```

**добавили функцию searchMovies  для поиска**
```javascript
    searchMovies = str => {
        fetch(`http://www.omdbapi.com/?apikey=d7b16aad&s=${str}`)
        .then(response => response.json())
        .then(data => this.setState({movies : data.Search}))
    }
```
**в render при вызове компонента Search , передаем в него нашу функцию**
```javascript
    <Search searchMovies = {this.searchMovies}/>
```

**Search.jsx**
```javascript
import React from 'react'

class Search extends React.Component {

    state ={
        search : ''
    }

    handleKey = event => {
        if(event.key === 'Enter'){
            this.props.searchMovies(this.state.search)
        }
    }
    render(){
        return (
            <div className="row"> 
                <div className="input-field">
                    <input 
                        placeholder='search'  
                        type="search" 
                        className="validate" 
                        value={this.state.search}
                        onChange={(e) => this.setState({search : e.target.value})}
                        onKeyDown = {this.handleKey}
                    />
                    <button className = 'btn search-btn'onClick={() =>this.props.searchMovies(this.state.search)}>Search</button>
                </div>
            </div>
        )   
    }
}
```

**функция при клике на enter запускате функцию поиска переданную из main.jsx**
```javascript
    handleKey = event => {
        if(event.key === 'Enter'){
            this.props.searchMovies(this.state.search)
        }
    }
```

**В инпут добавили обработчик , чтобы при нажатии особой кнопки (меняет state)**
```javascript
    <input 
        value={this.state.search}
        onChange={(e) => this.setState({search : e.target.value})}
        onKeyDown = {this.handleKey}
    />
```
**добавили button , который из за обработчика onClick , при нажатии делает тоже самое что и нажатие на enter**
```javascript
    <button className = 'btn search-btn'onClick={() =>this.props.searchMovies(this.state.search)}>Search</button>
```

---
**Валидация (разделение на фильмы и сериалы)**

**Изменить функцию searchMovies()  в main.js**
*Функция теперь принимает поле type с параметром по умолчанию 'all' , если эта функция принимает type != all, то к запросу на сервер добавляется '&type' с пришедшим типом*
```javascript
    searchMovies = (str , type = 'all' ) => {
        fetch(`http://www.omdbapi.com/?apikey=d7b16aad&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
        .then(response => response.json())
        .then(data => this.setState({movies : data.Search}))
    }
```

**Изменение компоненты Search.jsx**

*добавили в state ключ type , с значением all*

```javascript
import React from 'react';

class Search extends React.Component {
  state = {
    search: '',
    type: 'all',
  };

  handleKey = (event) => {
    if (event.key === 'Enter') {
      this.props.searchMovies(this.state.search , this.state.type );
    }
  };

  handleFilter = (event) => {
    this.setState(()=> ({ type: event.target.dataset.type }) , ()=>{
        this.props.searchMovies(this.state.search , this.state.type );
    });    
  };

  render() {
    return (
      <div className="row">
        <div className="input-field">
          <input
            placeholder="search"
            type="search"
            className="validate"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="btn search-btn"
            onClick={() => this.props.searchMovies(this.state.search , this.state.type)}
          >
            Search
          </button> 
          <div>
            <label>
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="all"
                onChange={this.handleFilter}
                checked={this.state.type ==='all'}
              />
              <span>ALL</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="movie"
                onChange={this.handleFilter}
                checked={this.state.type ==='movie'}
              />
              <span>Movies only</span>
            </label>
            <label>
              <input
                className="with-gap"
                name="type"
                type="radio"
                data-type="series"
                onChange={this.handleFilter}
                checked={this.state.type ==='series'}
              />
              <span>Series only</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export { Search };

```

**функция handleKey при вызове функции searchMovies , она передает в нее значение type из state↓**

```javascript
  handleKey = (event) => {
    if (event.key === 'Enter') {
      this.props.searchMovies(this.state.search , this.state.type );
    }
  };
```

**добавили функцию handleFilter в которой есть 2 callBack :**
* принимает value активного radioBtn
* вызывает функцию searchMovies 
```javascript
  handleFilter = (event) => {
    this.setState(()=> ({ type: event.target.dataset.type }) , ()=>{
        this.props.searchMovies(this.state.search , this.state.type );
    });    
  };
```

**radioBtn**

* data-type="series" -  хранится название типа который примит 1 колбек в функции handleFilter (()=> ({ type: event.target.dataset.type }))
* onChange={this.handleFilter} - обработчик запускающий функцию
* checked={this.state.type ==='series'} - сравнивает значение в state

```javascript
 <label>
    <input
        className="with-gap"
        name="type"
        type="radio"
        data-type="series"
        onChange={this.handleFilter}
        checked={this.state.type ==='series'}
        />
    <span>Series only</span>
</label>
```

---

**Обработка неудачного поиска**

## main.js :

*Добавили в state ключ loading*
```javascript
    state = {
        movies : [],
        loading : true
    }
```

**Если значение loading = false , то идет отработка компонента movies , иначе сработает компонент Prealoader **
```javascript
    render(){
        const {movies , loading} = this.state

        return <div className='container content'>
            <Search searchMovies = {this.searchMovies}/>
                {
                    !loading ? (
                        <Movies movies={movies} />   
                    ) :
                        <Prealoader />
                }
            </div>
    }
```
**componentDidMount при запросе к api , помима добавления в массив всех фильмов , меняет значение loading на false**

```javascript
    componentDidMount(){
        fetch('http://www.omdbapi.com/?apikey=d7b16aad&s=matrix')
            .then(response => response.json())
            .then(data => this.setState({movies : data.Search , loading :false}))
    }
```

**Функция до запроса меняет значение loading на true(сработает прелоадер) и в конце  меняет значение loading на false(сработает movies)**
```javascript
    searchMovies = (str , type = 'all' ) => {
        this.setState({loading :true})
        fetch(`http://www.omdbapi.com/?apikey=d7b16aad&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
        .then(response => response.json())
        .then(data => this.setState({movies : data.Search , loading :false}))
    }
```

## Movies.js

**делаем параметр по умолчание (movies = [] (пустой массив)) , если длинна массива больше 0 , тогда запускай map по movies , иначе пиши nothing found**
```javascript
import {Movie} from './Movie'

function Movies (props){
    const {movies = []} = props

    return <div className='movies'>
        {movies.length ? movies.map(movie => {
            return <Movie key={movie.imdbID} {...movie}/>
        }) : (<h4>nothing found</h4>)}
    </div>
}
export {Movies}
```