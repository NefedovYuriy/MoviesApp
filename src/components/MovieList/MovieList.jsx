import { React, Component } from 'react';

import './movieList.css';
import { SearchBar } from '../Search';
import { FoundError } from '../Error';
import { MovieCard } from '../MovieCard';
import { Loading } from '../loading';
import { ConnectionError } from '../ConnectionError';
import { Pagination } from '../Pagination';

export class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      queryMovie: '',
      movies: [],
      noResult: false,
      page: 0,
      totalPage: null,
      isLoading: false,
    };
  }

  searchPopularMovies = (page = 1) => {
    this.setState({ isLoading: true, page: 1 });
    this.props
      .getPopularMovie(page)
      .then((res) => {
        if (res.results.length !== 0) {
          this.setState({
            queryMovie: '',
            movies: res.results,
            totalPage: res.total_pages,
            page: res.page,
            isLoading: false,
            noResult: false,
          });
        } else {
          this.setState({
            isLoading: false,
            noResult: true,
          });
        }
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        this.props.onError(e);
      });
  };

  searchMovie = (movieName) => {
    this.setState({ isLoading: true, page: 1 });
    if (movieName.trim() !== '') {
      this.props
        .getMovies(movieName)
        .then((res) => {
          if (res.results.length !== 0) {
            this.setState({
              queryMovie: movieName,
              movies: res.results,
              totalPage: res.total_pages,
              page: res.page,
              isLoading: false,
              noResult: false,
            });
          } else {
            this.setState({
              isLoading: false,
              noResult: true,
              movies: [],
            });
          }
        })
        .catch((e) => {
          this.setState({ isLoading: false });
          this.props.onError(e);
        });
    } else {
      this.searchPopularMovies(1);
    }
  };

  searchPageMovie = (movieName, numPage) => {
    this.setState({ isLoading: true });
    this.props
      .getPageMovies(`${movieName}`, `${numPage}`)
      .then((res) => {
        this.setState({
          queryMovie: movieName,
          movies: res.results,
          totalPage: res.total_pages,
          page: res.page,
          isLoading: false,
        });
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        this.props.onError(e);
      });
  };

  render() {
    const { movies, totalPage, page, queryMovie, noResult, isLoading } = this.state;
    const { pageTab, sendRateStars, screenWidth } = this.props;
    return (
      <div className="movies">
        <SearchBar searchMovie={this.searchMovie} />
        <ConnectionError />
        {isLoading ? <Loading /> : null}
        {movies.length === 0 && noResult ? <FoundError /> : null}
        <div>
          <ul className="movies__list">
            {movies.map((movie) => {
              return (
                <MovieCard
                  poster={movie.poster_path}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  dateRelease={movie.release_date}
                  description={movie.overview}
                  dataGenres={movie.genre_ids}
                  rating={movie.vote_average}
                  countStars={movie.rating}
                  sendRateStars={sendRateStars}
                  screenWidth={screenWidth}
                />
              );
            })}
          </ul>
        </div>
        {movies.length > 0 ? (
          <Pagination
            pageTab={pageTab}
            searchPageMovie={this.searchPageMovie}
            page={page}
            totalPage={totalPage}
            queryMovie={queryMovie}
            getPopularMovie={this.searchPopularMovies}
          />
        ) : null}
      </div>
    );
  }
}
