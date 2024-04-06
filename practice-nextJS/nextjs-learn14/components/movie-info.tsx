import { API_URL } from '../app/(home)/page';

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const json = await response.json();
  return json;
}

async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <div>{JSON.stringify(movie)}</div>;
}

export default MovieInfo;
