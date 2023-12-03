import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Alert } from 'antd';

import { Main } from '../Main';
import './app.css';

export function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  // const apiKey = '905e917ccfddc7effe602b7d5165147a';
  // const urlArrMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  // const url = 'https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a';
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('An error occurred, please try again later');
      });
  }, []);

  if (!isOnline) {
    return (
      <div className="container">
        <div className="center">
          <Alert message="no network" type="error" />
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      {isLoading && (
        <div className="center">
          <Spin size="large" />
        </div>
      )}
      {!!error && (
        <div className="center">
          <Alert message={error} type="error" />
        </div>
      )}
      {!isLoading && !error && data?.length && (
        <Row gutter={[16, 16]}>
          {data.map((elem) => (
            <Col xs={24} md={12} key={elem.id}>
              <div className="movie">
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/original/${elem.poster_path}`}
                  alt={elem.title}
                />
                <div className="movie-text">
                  <h3 className="movie-title">{elem.title}</h3>
                  <span className="movie-description">{elem.overview}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      <Main />
    </div>
  );
}
