import { React, Component } from 'react';

import { MovieList } from '../components/MovieList';
import { RatedList } from '../components/RatedList';
import { Context } from '../context';
import { ToggleTab } from '../components/ToggleTab';
import { GuestSession, ServiceApi } from '../api';
import { ErrorIndicator } from '../components/Error';

import './app.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      pageTab: 'search',
      genres: [],
      guestToken: '',
      dataRated: {
        moviesRated: [],
        totalPage: 0,
        page: 1,
      },
      error: false,
      errorMassage: '',
      screenWidth: window.innerWidth,
    };
    this.api = new ServiceApi();
    this.guest = new GuestSession();
  }

  handleResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  onError = (e) => {
    console.log('Error!');
    console.log(e);
    console.log(e.message);
    this.setState({
      error: true,
      errorMessage: e.message,
    });
  };

  changePage = (tab) => {
    this.setState({
      pageTab: tab,
    });
  };

  getGenres = () => {
    this.api
      .getGenres()
      .then((res) => {
        this.setState({ genres: res.genres });
      })
      .catch(this.onError);
  };

  getToken = () => {
    const token = localStorage.getItem('guest');
    if (token) this.setState({ guestToken: token });
    else {
      this.guest
        .getToken()
        .then((token) => {
          this.setState({ guestToken: token });
          localStorage.setItem('guest', `${token}`);
        })
        .catch(this.onError);
    }
  };

  getMovies = (movieName) => {
    return this.api.getMovies(`${movieName}`);
  };
  getPopularMovie = (page) => {
    return this.api.getPopularMovies(page);
  };

  getPageMovies = (movieName, numPage) => {
    return this.api.getPageMovies(`${movieName}`, `${numPage}`);
  };

  sendRateStars = (id, countStars) => {
    this.guest.postRateStars(this.state.guestToken, id, countStars).catch(this.onError);
  };

  getGuestSession = (page = 1) => {
    return this.guest.getSession(this.state.guestToken, page);
  };

  getPageSession = (page) => {
    return this.api.getSession(this.state.guestToken, page);
  };
  componentDidMount() {
    this.getGenres();
    this.getToken();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { genres, pageTab, error, errorMessage, screenWidth } = this.state;
    const errorMessage1 = error ? <ErrorIndicator errorMessage={errorMessage} /> : null; // ?????Error
    const viewTab = (pageTab) => {
      if (pageTab === 'search') {
        return (
          <MovieList
            pageTab={pageTab}
            onError={this.onError}
            sendRateStars={this.sendRateStars}
            getMovies={this.getMovies}
            getPageMovies={this.getPageMovies}
            getPopularMovie={this.getPopularMovie}
            screenWidth={screenWidth}
          />
        );
      } else if (pageTab === 'rated') {
        return (
          <RatedList
            pageTab={pageTab}
            onError={this.onError}
            getGuestSession={this.getGuestSession}
            getPageSession={this.getPageSession}
            screenWidth={screenWidth}
          />
        );
      }
    };
    return (
      <Context.Provider value={genres}>
        <section className="container">
          <ToggleTab changePage={this.changePage} active={pageTab} />
          {viewTab(pageTab)}
          {errorMessage1}
        </section>
      </Context.Provider>
    );
  }
}
