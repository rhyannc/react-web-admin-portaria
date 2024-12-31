import React from "react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está tentando acessar não existe.</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default NotFound;
