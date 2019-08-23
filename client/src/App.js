import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import MovieUpdateForm from './Movies/MovieUpdateForm.js';
import Movie from './Movies/Movie.js';
import AddMovie from './Movies/AddMovie.js';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path="/update-movie/:id" component={MovieUpdateForm} />
      <Route path="/add-movie" component={AddMovie} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </div>
  );
};

export default App;

/*
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import ItemsList from './components/ItemsList';
import Item from './components/Item';
import ItemForm from './components/ItemForm';
import UpdateForm from './components/UpdateForm';
import './styles.css';

const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3333/items')
      .then(res => setItems(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="store-header">Dustin's Trinkets</h1>
        <div className="nav-links">
          <NavLink exact to="/item-form">
            Add Item
          </NavLink>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/item-list">Shop</NavLink>
        </div>
      </nav>

      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/item-list"
        render={props => (
          <ItemsList
            {...props} // this is the same as below
            //               match={props.match}
            //               history={props.history}
            //               location={props.location}
            items={items}
          />
        )}
      />
      <Route
        path="/item-list/:id"
        render={props => (
          <Item {...props} items={items} updateItems={setItems} />
        )}
      />
      <Route
        path="/item-form"
        render={props => <ItemForm {...props} updateItems={setItems} />}
      />
      <Route
        path="/update-item/:id"
        render={props => (
          <UpdateForm {...props} items={items} updateItems={setItems} />
        )}
      />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);


*/
