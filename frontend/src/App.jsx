import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/routes/HomePage';
import ProductsPage from './components/routes/ProductsPage';
import AboutUsPage from './components/routes/AboutUsPage';

function App() {

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='' element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='about-us' element={<AboutUsPage />} />
      </Route>
    )
  )
  

  return (

    <RouterProvider router={router} />
    
  )
}

export default App
