import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import { Main } from '../Main';
import './app.css';

export function App() {
  const [data, setData] = useState([]);
  // const apiKey = '905e917ccfddc7effe602b7d5165147a';
  // const urlArrMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  // const url = 'https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a';
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, []);

  console.log(data);
  return (
    <div className="container">
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
      <Main />
    </div>
  );
}
