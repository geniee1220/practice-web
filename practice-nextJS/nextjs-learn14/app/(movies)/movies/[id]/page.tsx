import { Suspense } from 'react';
import MovieInfo from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';

async function MoviePage({ params: { id } }: { params: { id: string } }) {
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
