import React, { useCallback } from 'react';
import "./movie-view.scss";
import PropTypes from 'prop-types';

// bootstrap import
import { Row, Col, Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();  

    this.state = {};
}

  render() {
   const { movie } = this.props;

    if (!movie) return null;


    return (      
      <div className="movie-view">
       <Card className="text-center" border="dark" text="white" bg="success mb-3" style={{width:'20rem'}}>
         <Card.Header>
          <Card.Img variant="top" className="movie-view-image" src={movie.ImagePath} />
          </Card.Header>
           <Card.Body>
              <Card.Title className="movie-title">
                 <h5>{movie.Title}</h5>
               </Card.Title>
               <Card.Text>
               <Card.Subtitle className="mb-2 text-muted movie-description">Description: </Card.Subtitle>
                   <span className="value">{movie.Description} </span>
               <Card.Subtitle className="mb-2 text-muted movie-genre">Genre: </Card.Subtitle>
                  <span className="value">{movie.Genre.Name}</span>
               <Card.Subtitle className="mb-2 text-muted movie-director">Director: </Card.Subtitle>
                   <span className="value">{movie.Director.Name}</span>
               </Card.Text>
            </Card.Body>
            <Card.Body>
            <Button className="reset-button" variant="secondary" size="lg" block onClick={() => this.props.onResetSelectedMovie()}>Back to Movies</Button>
            </Card.Body>
        </Card>
      </div>
    );
  }
  }

  MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,}).isRequired, 
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };