import { Outlet } from 'react-router-dom';
import Navbar from './nav-bar/NavBar';
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
