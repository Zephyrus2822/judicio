import { StrictMode } from "react";
import { createRoot  } from "react-dom/client";
import App from "./App.jsx";
import ReactDOM from 'react-dom/client'
import "./index.css";
import Navigation from "./components/Navigation.jsx";
import ContactUs from "./components/ContactUs.jsx";

import ChatBot from "./components/ChatBot.jsx";
// import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <StrictMode>
   
      <Navigation />
      <App />
      <ChatBot />
      <ContactUs  />
     
  </StrictMode>
);
