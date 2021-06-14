import React from 'react';
import { Navbar } from './components';
import MainRoutes from './routes/MainRoutes';
import AuthContextProvider from './components/Auth/AuthContextProvider/AuthContextProvider';

const App = () => {
  return (
    <AuthContextProvider>
      <div>
        <Navbar />
        <main className='container'>
          <MainRoutes />
        </main>
      </div>
    </AuthContextProvider>
  );
};

export default App;
