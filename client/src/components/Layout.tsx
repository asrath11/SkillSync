import { Outlet } from 'react-router-dom';
import Navbar from './nav-bar/NavBar';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
