import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import PDV from "./pages/PDV";
import Relatorio from './pages/Relatorio'; 
import NotFound from "./pages/NotFound"; // Importe o NotFound
import "./styles/App.css";
import Footer from './components/Footer'; // Importe o Footer

const App = () => {
  return (
    <Router>
    <div className="app">
      <Header />

      <div className="content">
      <Routes>
          <Route path="/" element={<PDV />} />
          <Route path="/pdv" element={<PDV />} />
          
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="*" element={<NotFound />} /> {/* Captura rotas não definidas */}
      </Routes>
      </div>

      <Footer /> {/* Adicione o Footer aqui */}
    </div>
    </Router>
  );
};

export default App;