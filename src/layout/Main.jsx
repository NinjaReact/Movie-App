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