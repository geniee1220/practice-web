import Movie from '../../components/movies';
import styles from '../../styles/home.module.css';

export const metadata = {
  title: 'Home',
};

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

async function Page() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Movie
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
          />
        </li>
      ))}
    </div>
  );
}

export default Page;
