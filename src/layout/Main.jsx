import React from 'react'
import {Movies} from '../components/Movies'

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
                        <h5>Loading..</h5>
                }
            </div>
    }
}

export {Main}