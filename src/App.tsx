import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/components/estaticos/navbar/Navbar";
import Footer from "./assets/components/estaticos/footer/Footer";
import Home from "./assets/paginas/home/Home";
import Login from "./assets/paginas/login/Login";
import Sobre from "./assets/paginas/sobre/Sobre";
import CadastroUsuario from "./assets/paginas/cadastroUsuario/CadastroUsuario";
import ListaTema from "./assets/components/temas/listaTema/ListaTema";
import CadastroPost from "./assets/components/postagens/cadastroPost/CadastroPost";
import DeletarPostagem from "./assets/components/postagens/deletarPostagem/DeletarPostagem";
import ListaPostagem from "./assets/components/postagens/listaPostagem/ListaPostagem";
import CadastroTema from "./assets/components/temas/cadastroTema/CadastroTema";
import DeletarTema from "./assets/components/temas/deletarTema/DeletarTema";
import { Provider } from "react-redux";
import store from "./store/store";
import Perfil from "./assets/components/perfil/Perfil";

function App() {
  return (
    <Provider store={store}>
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
            <Route path="/temas" element={<ListaTema />} />
            <Route path="/postagens" element={<ListaPostagem />} />
            <Route path="/cadastrarPostagem" element={<CadastroPost />} />
            <Route path="/cadastrarPostagem/:id" element={<CadastroPost />} />
            <Route path="/cadastrarTemas" element={<CadastroTema />} />
            <Route path="/cadastrarTemas/:id" element={<CadastroTema />} />
            <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            <Route path="/perfil" element={<Perfil />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
