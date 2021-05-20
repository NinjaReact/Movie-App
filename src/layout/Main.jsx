import React from 'react'
import {Movies} from '../components/Movies'
import {Prealoader} from '../components/Preloader'
import {Search} from '../components/Search'

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component{
    state = {
        movies : [],
        loading : true
    }
    
    componentDidMount(){
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
            .then(response => response.json())
            .then(data => this.setState({movies : data.Search , loading :false}))
    }

    searchMovies = (str , type = 'all' ) => {
        this.setState({loading :true})
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
        .then(response => response.json())
        .then(data => this.setState({movies : data.Search , loading :false}))
    }

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
}

export {Main}