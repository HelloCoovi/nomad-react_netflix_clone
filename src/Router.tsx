import { Routes, Route } from 'react-router';

import Home from './routes/Home';
import Search from './routes/Search';
import Tv from './routes/Tv';

export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='tv' element={<Tv />} />
      <Route path='search' element={<Search />} />
    </Routes>
  );
}
