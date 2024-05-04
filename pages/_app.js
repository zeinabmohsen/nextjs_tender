import Sidebar from '@/components/Sidebar';
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router';

import '@/styles/globals.css';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <Provider store={configureStore().store}>
      {!isLoginPage && (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      )}
      {isLoginPage && <Component {...pageProps} />}
      <ToastContainer />
    </Provider>
  );
}

