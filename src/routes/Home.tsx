import { useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from '../api';

import { motion, AnimatePresence } from 'motion/react';
import { makeImagePath } from '../utils';

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const offset = 6;

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <>
          <S.Banner
            onClick={incraseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
          >
            <S.Title>{data?.results[0].title}</S.Title>
            <S.Overview>{data?.results[0].overview}</S.Overview>
          </S.Banner>
          <S.Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <S.Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie: any) => (
                    <S.Box
                      key={movie.id}
                      $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                    />
                  ))}
              </S.Row>
            </AnimatePresence>
          </S.Slider>
        </>
      )}
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    background: black;
    padding-bottom: 200px;
  `,
  Loader: styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Banner: styled.div<{ $bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.$bgPhoto});
    background-size: cover;
  `,
  Title: styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
  `,
  Overview: styled.p`
    font-size: 30px;
    width: 50%;
  `,
  Slider: styled.div`
    position: relative;
    top: -100px;
  `,
  Row: styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
  `,
  Box: styled(motion.div)<{ $bgPhoto: string }>`
    background-color: white;
    background-image: url(${(props) => props.$bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    font-size: 66px;
  `,
};
