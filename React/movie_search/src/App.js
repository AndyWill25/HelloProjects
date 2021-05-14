import React, { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "The Avengers fight Thanos."},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", title: "The Avengers", overview: "The Avengers fight Loki."}
    // ]
 
    this.state = {
        rows: [],
    }
  }

  performSearch(searchTerm){
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fe806faed033a9b707afdfa3df618da0&query=${searchTerm}`
    fetch(url)
    .then(response => {
      return response.json()
    })
    .then(searchResults => {
      let movies = searchResults.results;
      var movieRows = [];
      movies.forEach((movie) => {
        const movieRow = <div key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500
` + movie.poster_path} alt="poster"/>
                            <h3>{movie.title}</h3>
                            {movie.overview}
                          </div>
          movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    })
    .catch(error => {
      console.error('Error is coming from API: ', error)
    })
  }
  searchChangeHandler = (event) => {
    this.performSearch(event.target.value);
  }
  render(){
  return(
    <div>
      <h1>Movie Search</h1>
      <input type="text" placeholder="Enter your movie" id="inputField" onChange={this.searchChangeHandler} />
      <p>{this.state.rows}</p>
    </div>
  );
}
}

export default App;



// https://api.themoviedb.org/3/movie/550?api_key=fe806faed033a9b707afdfa3df618da0&callback=test
