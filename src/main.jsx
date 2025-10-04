import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="349924530071-vkns7b4gvkn50ps6g8dnec0cesjqllju.apps.googleusercontent.com">
    <App />
   </GoogleOAuthProvider>,
)
