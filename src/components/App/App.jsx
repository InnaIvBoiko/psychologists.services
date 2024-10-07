import { lazy } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
// const Psychologists = lazy(() => import('../../pages/Psychologists/Psychologists.jsx'));
// const Favorites = lazy(() => import('../../pages/Favorites/Favorites.jsx'));
// const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/psychologists' element={<Psychologists />} /> */}
        {/* <Route path='/favorites' element={<Favorites />} /> */}
        {/* <Route path='/*' element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  )
}