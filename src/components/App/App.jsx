import React, { useEffect, useState } from 'react';

import { Main } from '../Main';
import './app.css';


export function App() {
  const [data, setData] = useState([]);
  const apiKey = '905e917ccfddc7effe602b7d5165147a';
  const urlArrMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a'
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=905e917ccfddc7effe602b7d5165147a')
    .then(response => response.json())
    .then(data => {
      setData(data.results)
    })
  },[])

  console.log(data)
  return (
    <div className="app">
      {data.map(elem => (
        <div className = 'movie' key={elem.id}>
        <p>{elem.title}</p>
        <img src={`https://image.tmdb.org/t/p/original/${elem.poster_path}`} alt={elem.title} />
        </div>
        
      ))}
      <Main/>
    </div>
  );
}

