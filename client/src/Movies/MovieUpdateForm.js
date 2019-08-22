import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const MovieUpdateForm = props => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const changeHandler = ev => {
    setMovie({ ...movie, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.updateMovie(res.data);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  const starsOnChangeHandler = (idx, e) => {
    const updatedStars = [...movie.stars];
    updatedStars[idx] = e.target.value;
    setMovie({ ...movie, stars: updatedStars });
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

        <input
          type="string"
          name="stars"
          onChange={e => starsOnChangeHandler(movie.id, e)}
          placeholder="Stars"
          value={movie.stars}
        />

        <div className="baseline" />

        <button onSubmit={handleSubmit} className="md-button form-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
// */
// {
//   id: 5,
//   title: 'Tombstone',
//   director: 'George P. Cosmatos',
//   metascore: 89,
//   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
// }*/
