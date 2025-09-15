import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/routes/HomePage';

function App() {

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='' element={<NavBar />}>
        <Route index element={<HomePage />} />
      </Route>
    )
  )
  

  return (

    <RouterProvider router={router} />
    
  )
}

export default App
