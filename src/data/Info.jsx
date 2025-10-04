import { FaXTwitter , FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Info =  {
   nova:'CryptoNova',
   nav:[
        {id:1 , name:'home' , link:'/'},
        {id:2 , name: 'news'  , link:'/news'},
        {id:3 , name: 'login' , link:'/login' },
        {id:4 , name: 'register' , link:'/register'} ,
   ],
   nav2: [
       {id:1 , name:'home' , link:'/'},
        {id:2 , name: 'news'  , link:'/news'},
      {id:3 , name:'dashboard' , link:'/dashboard'},
      {id:4 , name: 'logout'  , link:'/logout'}
   ],
   nav3: [
       {id:1 , name:'home' , link:'/'},
        {id:2 , name: 'news'  , link:'/news'},
      {id:3 , name:'dashboard' , link:'/dashboard'},
   ],
   text:'CryptoNova delivers real-time crypto prices, news, and insights to help you stay informed and manage your portfolio with ease.',
   copy:'CryptoNova © 2024. Created by Ogunsola Faruk. All rights reserved.' ,
   follow:"Follow Us",
   link:"Quick Links",
   contact:[
      {id: 1 , icon:FaXTwitter , link:'https://twitter.com/Fatzy_tech' },
      {id:2 , icon:FaLinkedin , link:'www.linkedin.com/in/faruk-ogunsola-394815312' },
      {id:3 , icon:FaGithub , link:'https://github.com/fatzy070'}
   ]
};

export default Info;