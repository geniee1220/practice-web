import { Suspense } from 'react';
import MovieInfo, { getMovie } from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';

interface IParmas {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: IParmas) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

async function MoviePage({ params: { id } }: IParmas) {
  return (
    <div>
      <Suspense fallback={<div>Loading movie info ...</div>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<div>Loading movie videos...</div>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

export default MoviePage;
