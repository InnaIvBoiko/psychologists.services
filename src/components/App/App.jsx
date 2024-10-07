import { lazy } from 'react';
import Layout from '../Layout/Layout.jsx';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const PsychologistsPage = lazy(() => import('../../pages/PsychologistsPage/PsychologistsPage.jsx'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/psychologists' element={<PsychologistsPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}