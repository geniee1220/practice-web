import { API_URL } from '../app/(home)/page';

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const json = await response.json();
  return json;
}

async function MovieVideos({ id }: { id: string }) {
  const movie = await getVideos(id);
  return <div>{JSON.stringify(movie)}</div>;
}

export default MovieVideos;
