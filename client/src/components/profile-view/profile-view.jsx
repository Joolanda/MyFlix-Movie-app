import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from 'react-bootstrap';

export class Profileview extends React.Component {

constructor(props) {
  super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    }
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    letusername = localStorage.getItem('token')
    axios.('https://myflix-movie.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
    then(response => {
      this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.BirthDate,
          FavoriteMovies: response.data.FavoriteMovies
        });

      })
       .catch(function (error) {
       console.log(error);
     });
   }
// Task: 
// Authenticated users of myFlix:
// will also want to make GET for viewing their profile,
// and PUT requests for updating their profile, 
//POST requests for registering new users, and 
//DELETE requests for deregistering
   render() {
     const { username, password, email, birthday, favoriteMovies } =this.state
     const { movies } = this.props;
     
     return (
       <div>
         <Container className="profile-view">
           <h1>My Flix Profile</h1>
           <br/>
           <Card>
             <Card.Body>
               <Card.Text>Username: {username}</Card.Text>
               <Card.Text>Password: xxxxxx </Card.Text>
               <Card.Text>Email: {email}</Card.Text>
               <Card.Text>Birthday: {birthday}</Card.Text>
               <Card.Text>Favorite Movies: {birthday}</Card.Text>
                <div className="my-favorites"></div>
                <div className="buttons-back-deluser"></div>
                <br/>
                <br/>
                <Link to={/users}
             </Card.Body>
           </Card>
         </Container>
       </div>
     )
   }

  }
}