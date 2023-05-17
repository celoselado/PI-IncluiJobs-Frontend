import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/paginas/home/Home';
import Login from './assets/paginas/login/Login';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import './App.css'

function App() {
  
  return(
    <BrowserRouter>
    <Navbar />
    <div style={{ minHeight: '100vh' }}>
    <Routes> // Antigo Switch
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    </div>
    <Footer />
    </BrowserRouter>
    );
  }
  
  export default App;
