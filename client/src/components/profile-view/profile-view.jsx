import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile-view.scss";
// bootstrap import
import { Card, Button, Container, Form } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.Username = null,
    this.Password = null,
    this.Email = null,
    this.Birthday = null

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      favorites: [],
      movies: [],
    };
  }
  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios.get(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          favorites: response.data.favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //DELETE requests for deregistering
 deleteUser = (e) => {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflix-movie.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(`${username} was deleted`);
        alert("your profile is successfully deleted");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error deleting User profile");
      });
  };


  // UPDATE or PUT requests for User profile
  profileUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
// revision : axios.put("my/url/goes/here", { Username: "...", password: "...", ... }, { headers: Authorization: "..." } ).then(...)
    axios
      .put(`https://myflix-movie.herokuapp.com/users/${username}`, 
        { 
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail: this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('your changes are saved!');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        })
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  setUsername(input) {
    this.Username = input;
  }
  setPassword(input) {
    this.Password = input;
  }
  setEmail(input) {
    this.Email = input;
  }
  setBirthday(input) {
    this.Birthday = input;
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  // REMOVE favorite movie from User profile movie._id
  
  removeFavorite = (e, movie) => {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(
        `https://myflix-movie.herokuapp.com/users/${username}/favorites/:${movie}/`,
        {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log(`Movie removed from your favorites`);
        window.open("/", "_self");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { movies } = this.props;
    const userFavorites = this.state.favorites;
    const favoritesList = movies.filter((movie) => userFavorites.includes(movie._id));
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // if (favorites.length === 0) {
    //   return <div>You have no favorite movies.</div>}
            
    return (
      <Container className="profile-update-container">
        <Card
          className="border-success text-white bg-secondary mb-3"
          style={{ width: "20rem" }}
        >
          <Card.Title> My Flix Profile </Card.Title>
          <Card.Body>
          <br />
            <Card.Text>Username: {Username}</Card.Text>
            <Card.Text>Email: {Email}</Card.Text>
            <Card.Text>Birthday: {Birthday}</Card.Text>
            <Button onClick={() => this.deleteUser()} variant="danger" className='delete-button'>Delete account</Button>
            <Link to={'/'}>
              <Button className='delete-button' variant="info"> Back</Button>
            </Link>
            </Card.Body>
          </Card>
          <Container>
            <Card.Text> My favorite movies: {favorites} </Card.Text>
            {favoritesList.map((movie) => {
              return (
                <Card key={movie._id} style={{width: '20rem'}} className="favorite-movies">
                  <Card.Img variant='top' src={movie.ImagePath}/>
                  <Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant='link' className='fav-movie'>Movie Details</Button>
                    </Link >
                    <Link to=''>
                      <Button onClick={() =>this.removeFavorite(movie._id)}>delete favorite movie</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
            </Container>
            <Container>
            <Card.Body className = "update">
              <Card.Text>If you want to update your profile, you can use this form:</Card.Text>
            <Form className="update-form" onSubmit={(e) => this.profileUpdate(e, this.Username, this.Password,this.Email, this.Birthday)} >
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username:</Form.Label>
                <Form.Control type="text" placeholder="Change Username" defaultValue={Username} onChange={(e) => this.setUsername(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" defaultValue="" onChange={(e) => this.setPassword(e.target.value)} required/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" defaultValue={Email} onChange={(e) => this.setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" defaultValue={Birthday} onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>
              <Button variant="success" className="update" type="submit" size="sm" >
                Update
              </Button>
          </Form>
        </Card.Body>
      </Container>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    favorites: PropTypes.array
  })
}