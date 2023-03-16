import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
// import Cart from './pages/Cart';
import MainLayout from './components/Layout/MainLayout';
import React, { Suspense } from 'react';

const Cart = React.lazy(() => import(/*webpackChunkName: 'Cart'*/ './pages/Cart'));

function App() {
  return (
    <Suspense fallback={<div>Loading please wait...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
