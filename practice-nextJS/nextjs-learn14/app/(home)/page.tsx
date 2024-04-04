export const metadata = {
  title: 'Home',
};

const URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

async function Page() {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
}

export default Page;
