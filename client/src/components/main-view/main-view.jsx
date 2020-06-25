import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
//import { RegistrationView } from '../registration-view/registration-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// bootstrap import
import { Row, Col, Card, CardDeck } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
     axios.get('https://myflix-movie.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }
  // get movies method, new code task 35, make a request to the movies endpoint
  getMovies(token) {
    axios.get('https://myflix-movie.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
     })
    .then(response => {
       // Assign the result to the state
       this.setState({
       movies: response.data
      });
   })
   .catch(function (error) {
   console.log(error);
   });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onResetSelectedMovie() { 
  this.setState({ 
  selectedMovie: null, 
  });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
      <CardDeck>
      {selectedMovie
         ? <MovieView movie={selectedMovie} 
            onResetSelectedMovie={() => this.onResetSelectedMovie()}
           />
            : movies.map(movie => (
             <MovieCard 
              key={movie._id} 
              movie={movie} 
              onClick={movie => this.onMovieClick(movie)}
            />
         ))
      }
      </CardDeck>
      </div>
    );
  }
}
