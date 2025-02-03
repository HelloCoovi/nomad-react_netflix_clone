import { useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from '../api';

import { motion, AnimatePresence } from 'motion/react';
import { makeImagePath } from '../utils';

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });

  const [index, setIndex] = useState(0);
  const incraseIndex = () => setIndex((prev) => prev + 1);

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
            <AnimatePresence>
              <S.Row
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 1 }}
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <S.Box key={i}>{i}</S.Box>
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
  Box: styled(motion.div)`
    background-color: white;
    height: 200px;
    color: red;
    font-size: 66px;
  `,
};
