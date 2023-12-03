import React from 'react';
import { DatePicker } from 'antd';

import { MovieCard } from '../MovieCard';

export function Main() {
  return (
    <div>
      <MovieCard />
      <DatePicker />
    </div>
  );
}
