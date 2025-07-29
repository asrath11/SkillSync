import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/landing-page';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
    </>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
