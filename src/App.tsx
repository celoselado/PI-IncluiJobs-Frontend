import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/components/estaticos/navbar/Navbar";
import Footer from "./assets/components/estaticos/footer/Footer";
import Home from "./assets/paginas/home/Home";
import Login from "./assets/paginas/login/Login";
import Sobre from "./assets/paginas/sobre/Sobre";
import CadastroUsuario from "./assets/paginas/cadastroUsuario/CadastroUsuario";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          {" "}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
