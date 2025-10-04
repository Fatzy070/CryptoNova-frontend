import { useState } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Layout from './layouts/Layout';
import HomePage from './pages/home/HomePage';
import NewsPage from './pages/news/NewsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/home/DashboardPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {

  return (
  <>
    <BrowserRouter>
        <Routes >
           <Route path='/' element={<Layout />} >
           <Route index element={<HomePage />} />
           <Route path='/news' element={<NewsPage />} />
           <Route path='/login' element={<LoginPage />} />
           <Route path='/register' element={<RegisterPage />} />
           <Route path='/dashboard' 
           element={
            <ProtectedRoute>
           <DashboardPage />
           </ProtectedRoute>
           } />
           </Route>
        </Routes>
    </BrowserRouter>

     <ToastContainer position="top-right" autoClose={3000} />
   </>
  );
};

export default App;
