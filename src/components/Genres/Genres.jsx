import { React, Component } from 'react';

import './genres.css';
import { Context } from '../../context';

export class Genres extends Component {
  render() {
    const { dataGenres } = this.props;
    return (
      <Context.Consumer>
        {(value) => {
          let genreNames = dataGenres.map((item) => {
            let getItem = value.find((el) => el.id === item);
            return getItem?.name;
          });
          let genres = genreNames.slice(0, 3).map((name, id) => {
            return (
              <span key={id} className="genre">
                {name}
              </span>
            );
          });
          return genres;
        }}
      </Context.Consumer>
    );
  }
}
