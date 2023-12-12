import { React, Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

import './searchBar.css';

export class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };
  }

  handleChange = debounce((e) => {
    const query1 = e.target.value;
    this.setState({ query: query1 });
    this.props.searchMovie(query1);
  }, 500);

  render() {
    return (
      <Input
        className="movies__search"
        placeholder="Type to search..."
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}
