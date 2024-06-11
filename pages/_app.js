import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '@/components/Sidebar';
import 'regenerator-runtime/runtime';
import '@/styles/globals.css';
import configureStore from '../redux/store';


const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token; 
  }
  return false; 
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const loggedIn = isLoggedIn();
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
    if (!loggedIn && !isLoginPage && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [loggedIn, isLoginPage, router.pathname]);

  return (
    <Provider store={configureStore().store}>
      {loggedIn && !isLoginPage && (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
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
