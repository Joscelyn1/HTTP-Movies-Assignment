import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieUpdateForm = props => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  console.log(movie, 'movie');

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const changeHandler = ev => {
    setMovie({ ...movie, [ev.target.name]: ev.target.value });
  };

  const starsOnChangeHandler = index => e => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res, 'res of handleSubmit');
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="MetaScore"
          value={movie.metascore}
        />
        <div className="baseline" />

        {movie.stars.map((starName, index) => {
          return (
            <input
              type="text"
              placeholder="star"
              value={starName}
              key={index}
              onChange={starsOnChangeHandler(index)}
            />
          );
        })}

        <div className="baseline" />

        <button type="submit" className="md-button form-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
