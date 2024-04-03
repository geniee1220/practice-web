'use client';

import { useEffect, useState } from 'react';

function Page() {
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    const response = await fetch(
      'https://nomad-movies.nomardcoders.workers.dev/movies'
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>{JSON.stringify(movies)}</div>;
}

export default Page;
