import { React, Component } from 'react';

import './app.css';
import { MovieList } from '../MovieList';
import { ErrorIndicator } from '../Error';
import { RatedList } from '../RatedList';
import { Context } from '../../context';
import { ToggleTab } from '../ToggleTab';
import { GuestSession, ServiceApi } from '../../api';

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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

  getAllMovies = (movieName) => {
    return this.api.getAllMovies(`${movieName}`);
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
            getAllMovies={this.getAllMovies}
            screenWidth={screenWidth}
          />
        );
      } else if (pageTab === 'rated') {
        return (
          <RatedList
            pageTab={pageTab}
            onError={this.onError}
            getGuestSession={this.getGuestSession}
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
