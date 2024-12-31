import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="menu">
      <div className="menu-container">
        {/* Logo ou Título */}
        <div className="logo">
          <h1>Portaria Faisão</h1>
        </div>
        {/* Links ou Botões */}
        <ul className="menu-links">
          <li><Link to="/pdv">PDV</Link></li>
          <li><Link to="/relatorio">Relatório</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
