import { Header } from './components/Header';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';

import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="wrapper">
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
