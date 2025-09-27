import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/routes/HomePage';
import ProductsPage from './components/routes/ProductsPage';
import AboutUsPage from './components/routes/AboutUsPage';
import ContactPage from './components/routes/ContactPage';
import OrderPage from './components/order/OrderPage';
import ProductPage from './components/product/ProductPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='' element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='products/:category/:slug' element={<ProductPage />} />
          <Route path='about-us' element={<AboutUsPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='CompleteYourOrder' element={<OrderPage />} />
        </Route>

        <Route path='secret/admin' element={<AdminLogin />} />
        <Route path='secret/admin/dashboard' element={<AdminDashboard />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
