import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieUpdateForm from './MovieUpdateForm.js';
import { Route } from 'react-router';

function MovieList(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <div>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
