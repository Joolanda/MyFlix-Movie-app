import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import axios from '../profile-view/node_modules/axios';
import { Link } from "react-router-dom";


// bootstrap imports
import { Row, Col, Button, Form, Container} from 'react-bootstrap';

export function RegistrationView (props) {
const [ username, createUsername ] = useState('');
const [ password, createPassword ] = useState('');
const [ email, createEmail ] = useState('');
const [ birthday, createBirthday] = useState('');

//if (user) return null;  

const handleRegister = (e) => {
  e.preventDefault();

  axios.post('https://myflix-movie.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday,
  })
  .then(response => {
    const data = response.data;
    alert('Your account has been created! Please login with your new username and password.');
    console.log(data);
    window.open('/client', '_self'); // if backend validation is successful, the data will be logged in the console and the user will be redirected to the main view. 
  })
  .catch(e => { 
  console.log('error user registration');
  });
};


   return (
     <div className="registration-view">
    <Container className="registration-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} className="form-container">
          <Form className="registration-form">

           <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control size="sm" type="text" placeholder="username" value={username} onChange={e => createUsername(e.target.value)}/>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

              <Form.Group controlId="formBasicPassword">              
              <Form.Label>Password:</Form.Label> 
              <Form.Control size="sm" type="password" placeholder="password" value={password} onChange={e => createPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">              
              <Form.Label> Email: </Form.Label>
              <Form.Control size="sm" type="email" placeholder="watch out for typos" value={email} onChange={e => createEmail(e.target.value)} />
              <Form-Text className="text-muted">
                 We'll never share your email with anyone else.
              </Form-Text>
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">              
              <Form.Label>Birthday:</Form.Label> 
              <Form.Control size="sm" type="date" placeholder="00/00/2000" value={birthday} onChange={e => createBirthday(e.target.value)}/>
            </Form.Group>

              <Button variant="success" type="submit" onClick={handleRegister}>Register</Button>
                <br></br>
                <Link to={`/`}>      
                  <Button variant="link" type="button">
                    Already registered? Click here to log in!
					        </Button>
                </Link> 

            </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
 }

 //RegistrationView.propTypes = {
  // no props so far
//};
// RegistrationView.propTypes = {
// 	setNewUsername: PropTypes.string,
//   setNewPassword: PropTypes.string,
//   setNewEmail: PropTypes.string,
// };
//
//    <Button variant="success" type="submit" size="sm"  onClick={cancelRegister}>You already have an account? Click here</Button>