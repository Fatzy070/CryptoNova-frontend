import React from 'react';
import Info from '../data/Info';
import { NavLink } from 'react-router-dom';
import Nova from '../assets/Nova.png';

const Footer = () => {
    const { nova , nav3 , copy , text  , link , follow , contact} = Info;
    return (
        <footer className='bg-gradient-to-r from-[#1F1F1F] via-[#2C2C2C] to-[#3B2F2F] text-gray-300 py-10 px-4'>
           <section className='flex md:flex-nowrap flex-wrap gap-10 justify-center items-center' >
             <div className='md:w-[400px] lg:w-[500px]'>
                <img src={Nova} alt="CryptoNova Logo" className='w-[250px] h-[90px] block mb-4'/>
                <p className='text-gray-400'>{text}</p>
             </div> 

            <section className='flex md:flex-nowrap flex-wrap gap-5 md:justify-between flex-1 lg:pr-50 md:pr-10' >
                 <div>
                <h1 className='font-bold lg:text-2xl text-white'>{link}</h1>
               <div className='flex flex-col gap-2 mt-4'>
                {nav3.map((item , index) => {
                    return (
                        <NavLink 
                        key={index}
                        to={item.link}
                        className='capitalize text-gray-400 hover:text-white transition-colors'
                        >
                        {item.name}
                        </NavLink>
                    )
               })}
               </div>
             </div>
             <div className='w-full md:w-auto'>
                <h1 className='font-bold text-2xl text-white'>{follow}</h1>
                <div className='flex gap-3 justify-center text-[1.5rem] mt-4'>
                    {contact.map((item , index) => {
                        const Icon = item.icon
                        return (
                            <div key={index}>
                                <a href={item.link} target='_blank' className='hover:text-white transition-colors'>
                                      <Icon />
                                </a>
                             </div>   
                        )
                    })}
                </div>
             </div>
            </section>
           </section>

           <div>
            <p className='text-center border-t border-gray-600 pt-8 text-gray-400 mt-8'>{copy}</p>
           </div>
        </footer>
    );
};

export default Footer;
