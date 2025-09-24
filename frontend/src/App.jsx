import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/routes/HomePage';
import ProductsPage from './components/routes/ProductsPage';
import AboutUsPage from './components/routes/AboutUsPage';
import ContactPage from './components/routes/ContactPage';
import OrderPage from './components/order/OrderPage'
import ProductPage from './components/product/ProductPage';

function App() {

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='' element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='products/:category/:slug' element={<ProductPage />} />
        <Route path='about-us' element={<AboutUsPage />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='CompleteYourOrder' element={<OrderPage />} />
      </Route>
    )
  )
  

  return (

    <RouterProvider router={router} />
    
  )
}

export default App
