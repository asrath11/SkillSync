import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/landing-page';
import NotFound from './pages/NotFound';
import SignUp from './pages/sign-up';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/sign-up' element={<SignUp />} />
    </>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
