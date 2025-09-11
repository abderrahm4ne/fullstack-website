import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<NavBar />}>
      </Route>
    )
  )
  

  return (

    <RouterProvider router={router} />
    
  )
}

export default App
