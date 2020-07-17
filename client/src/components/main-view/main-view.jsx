import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// bootstrap import
import { Row, Col, Card, CardGroup, Nav, Navbar, Container } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
  //    movie: null,
  //    selectedMovie: null,
      user: null
    };
  }
  // old code from task 34 and before
  // componentDidMount() {
  //    axios.get('https://myflix-movie.herokuapp.com/movies')
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     }); 
  // }

  // // new code added with Task 3.5
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  
  // // new method get movies, new code Task 3.5, make a request to the movies endpoint
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

// new method for signing out, button mainview
  onLoggedOut() {
    this.setState({
      user: null
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open('/', '_self');
  }


  render() {
    const { movies, user } = this.state;
    const username = localStorage.getItem('user');

    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
       <CardGroup className="main-view">
         <Navbar bg="success" variant="dark" fixed="top">
         <Navbar.Brand as={Link} to="/">MyFlix Movie</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${user}`}>Account</Nav.Link>
                <Nav.Link onClick={(user) => this.onLoggedOut()} href="/client/">
										Logout
								</Nav.Link>
            </Nav>
          </Navbar>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m}/>)
           }
          }/>
          <Route path="/register" render={() => {
            if (!user) return <RegistrationView/>}}/>
           <Route path="/movies/:movieId" 
              render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <CardGroup className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
           } />
           <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <CardGroup className="main-view"/>;
             return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
           } />
           <Route path="/users/:Username" render={() => {
            <ProfileView movies={movies} />}
            } />
        </CardGroup>
      </Router>
    );
  }
 }

// using 
//  <Switch>
//  <Route exact path="/" render={() => {
//    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//    return movies.map(m => <MovieCard key={m._id} movie={m}/>)
//    }
//    }/>
//     <Route path="/" exact={true}>
//       <RegistrationForm />
//     </Route>
//   </Switch>

 // home link: <Nav.Link as={Link} to="/">Home</Nav.Link>
