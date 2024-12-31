import React from "react";


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
          <li><a href="pdv">PDV</a></li>
          <li><a href="relatorio">Relatório</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
