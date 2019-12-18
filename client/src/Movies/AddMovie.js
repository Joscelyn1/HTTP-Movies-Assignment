import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddMovie(props) {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  const handleSubmit = e => {
    e.preventDefault();
    movie.stars = [movie.star1, movie.star2, movie.star3];
    axios
      .post('http://localhost:5000/api/movies', movie)
      .then(res => {
        console.log(res.data, 'addMovie');
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  const changeHandler = ev => {
    setMovie({ ...movie, [ev.target.name]: ev.target.value });
    //setMovie({ stars: mystars });
  };

  const mystars = [];
  const starHandler = ev => {
    mystars.push(ev.target.value);
  };

  return (
    <div>
      <h2>Add Movie</h2>
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

        <input
          type="text"
          placeholder="Star"
          name="star1"
          onChange={changeHandler}
        />

        <input
          type="text"
          placeholder="Star"
          name="star2"
          onChange={changeHandler}
        />

        <input
          type="text"
          placeholder="Star"
          name="star3"
          onChange={changeHandler}
        />

        <div className="baseline" />

        <button type="submit" className="md-button form-button">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
