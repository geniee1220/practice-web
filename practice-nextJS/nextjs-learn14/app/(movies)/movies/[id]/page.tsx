import { API_URL } from '../../../(home)/page';

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const json = await response.json();
  return json;
}

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const json = await response.json();
  return json;
}

async function MoviePage({ params: { id } }: { params: { id: string } }) {
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  return <div>{movie.title}</div>;
}

export default MoviePage;
