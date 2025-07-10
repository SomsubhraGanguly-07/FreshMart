
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import AuthForm from './components/AuthForm'
import { useAppContext } from './context/AppContext'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const App = () => {

  const isSellerPath = useLocation().pathname.includes('/seller');
  const { showUserLogin, setshowUserLogin } = useAppContext();

  return (
    <div>
      {/* Blur and hide Navbar when AuthForm is open */}
      {isSellerPath ? null : (
        <div className={showUserLogin ? 'blur-sm pointer-events-none select-none' : ''}>
          <Navbar />
        </div>
      )}
      {showUserLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm"
          onClick={e => {
            if (e.target === e.currentTarget) setshowUserLogin(false);
          }}
        >
          <AuthForm />
        </div>
      )}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App