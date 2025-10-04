import React from 'react';
import CryptoPrices from './CryptoPrices';
import Nova from './Nova';
const Home = () => {
    return (
        <div className='min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
            <Nova />
            <CryptoPrices />
        </div>
    );
};

export default Home;