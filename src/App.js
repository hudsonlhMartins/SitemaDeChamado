import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter} from 'react-router-dom'
import Rotas from './routes';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
       <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;
