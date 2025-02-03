import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../api';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });

  console.log(data);

  return <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}></div>;
}
