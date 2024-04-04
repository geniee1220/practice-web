'use client';

import { useEffect, useState } from 'react';

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      'https://nomad-movies.nomadcoders.workers.dev/movies'
    );
    const data = await response.json();
    setMovies(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>{isLoading ? 'Loading...' : JSON.stringify(movies)}</div>;
}

export default Page;
