import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const Layout = () => {
    return (
        <div>
           <div className='fixed w-full top-0 z-50' >
             <Header/>
           </div>
             
             <div className=''>
               <Outlet />
             </div>
            
            <div>
                <Footer/>
            </div>
             
        </div>
    );
};

export default Layout;