import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navigation from './components/Navigation.jsx'
import ContactUs from './components/ContactUs.jsx'
import ChatBot from './components/ChatBot.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navigation />   
    <App/>
    <ChatBot />
    <ContactUs />
  </StrictMode>,
)
