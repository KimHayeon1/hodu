import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import SellerCenter from './pages/SellerCenter';
import MakeProduct from './pages/MakeProduct';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='/sellercenter' element={<SellerCenter />} />
        <Route path='/makeproduct' element={<MakeProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
