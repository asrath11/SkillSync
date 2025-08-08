import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './components/Layout';

//pages
import LandingPage from './pages/landing-page';
import NotFound from './pages/NotFound';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import ProfileSetup from './pages/profile-setup';
import ProfileMatch from './pages/profile-match';
import CompletionCelebration from './pages/profile-setup/components/CompletionCelebration';
import Protect from './middleware/Protect';

//context providers
import { AuthProvider } from './context/authProvider';
import { ProfileProvider } from './context/profileProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path='/profile-setup'
          element={
            <Protect>
              <ProfileSetup />
            </Protect>
          }
        />
        <Route
          path='/profile-match'
          element={
            <Protect>
              <ProfileMatch />
            </Protect>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route
        path='/profile-complete'
        element={
          <Protect>
            <CompletionCelebration />
          </Protect>
        }
      />

      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </>
  )
);

function AppRouter() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default AppRouter;
