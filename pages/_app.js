import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '@/components/Sidebar';
import 'regenerator-runtime/runtime';
import '@/styles/globals.css';
import configureStore from '../redux/store';
import Navbar from '@/components/Navbar';


const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return { token, role };
  }
  return { token: null, role: null };
};

const isAdmin = () => {
  const { role } = getUserInfo();
  return role === 'admin';
};


const isLoggedIn = () => {
  const { token } = getUserInfo();
  return !!token;
};

const isDoctor = () => {
  const { role } = getUserInfo();
  return role === 'doctor';
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const loggedIn = isLoggedIn();
  const doctorRole = isDoctor();
  const isAdminRole = isAdmin();

  const isLoginPage = router.pathname === '/login';

  useEffect(() => {
    // Listen for route changes
    const handleRouteChange = () => {
      // Clear all existing toasts on route change
      toast.dismiss();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // Remove event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // Redirect to login page if not logged in and trying to access other pages
    if (!loggedIn && !isLoginPage) {
      router.push('/login');
    } else if (loggedIn && isDoctor() && !['/schedule', '/calendar', '/drprofile'].includes(router.pathname)) {
      router.push('/calendar');
    }
  }, [loggedIn, isLoginPage, router.pathname]);

  return (
    <Provider store={configureStore().store}>
      {loggedIn && !isLoginPage && (
        // Conditionally render Sidebar or Navbar based on isAdminRole
        <>
          {isAdminRole ? <Sidebar /> : <Navbar />}
          <Component {...pageProps} />
        </>
      )}
      {!loggedIn || isLoginPage ? (
        <Component {...pageProps} />
      ) : null}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}


