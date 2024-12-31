import React, { useState } from "react";
import api from "../services/api";
import Modal from "react-modal"; // Instale o Modal: npm install react-modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons"; // Ícone de impressora
import "./../styles/Relatorio.css";


const Relatorio = () => {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [dataSelecionadaend, setDataSelecionadaend] = useState("");
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [modalItensIsOpen, setModalItensIsOpen] = useState(false); // Controle do modal de itens
  const [todosItens, setTodosItens] = useState([]); // Itens consolidados de todas as ordens

  const handleConsultar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      const dataFormatada = dataSelecionada.split("-").reverse().join("/");
      const dataFormatadafim = dataSelecionadaend.split("-").reverse().join("/");

      const response = await api.post("/reportorder", {
        firstdt: dataFormatada,
        lastdt: dataFormatadafim,
      });

      setDadosRelatorio(response.data.orders || []);

      // Consolidar todos os itens das ordens
      const itensConsolidados = response.data.orders
        .flatMap((order) => order.items); // Extrai todos os itens
      setTodosItens(itensConsolidados);
    } catch (error) {
      console.error(error);
      setErro("Erro ao buscar os dados do relatório.");
    } finally {
      setCarregando(false);
    }
  };

  const handleOpenModalItens = () => {
    setModalItensIsOpen(true);
  };

  const handleCloseModalItens = () => {
    setModalItensIsOpen(false);
  };

  const calcularValorTotal = () => {
    return todosItens.reduce((acc, item) => acc + item.total, 0);
  };

  const consolidarItens = (itens) => {
    const itensAgrupados = {};
  
    itens.forEach((item) => {
      if (itensAgrupados[item.id_product]) {
        // Se o produto já existe no agrupamento, soma as quantidades e valores
        itensAgrupados[item.id_product].qtd += item.qtd;
        itensAgrupados[item.id_product].total += item.total;
      } else {
        // Caso contrário, adiciona o produto ao agrupamento
        itensAgrupados[item.id_product] = { ...item };
      }
    });
  
    // Retorna os itens consolidados como uma lista
    return Object.values(itensAgrupados);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Converte a string para um objeto Date
  
    // Ajusta o horário manualmente para o fuso horário de Brasília (-3h)
    date.setHours(date.getHours() + 3);
  
    // Formata o dia, mês e ano
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam de 0
    const year = date.getFullYear();
  
    // Formata a hora e os minutos
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Retorna a data no formato desejado
    return `${day}/${month}/${year} ${hours}:${minutes}hs`;
  };

  return (
    <div className="content">
      <div className="container">
        <h2>Relatório de Vendas</h2>
        {erro && <p className="mensagem-erro">{erro}</p>}

        <form onSubmit={handleConsultar} className="relatorio-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="data">Data Início:</label>
              <input
                type="date"
                id="data"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dataend">Data Final:</label>
              <input
                type="date"
                id="dataend"
                value={dataSelecionadaend}
                onChange={(e) => setDataSelecionadaend(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={carregando}>
            {carregando ? "Consultando..." : "Consultar"}
          </button>
        </form>

        <div className="resultados">
          
          {dadosRelatorio.length > 0 && (            
            <>
            <h3>Vendas</h3>
              {/* Botão para abrir o modal de relatórios de itens */}
              <button onClick={handleOpenModalItens} className="print-btn">
                Relatórios de Itens Vendidos <FontAwesomeIcon icon={faPrint} /> 
              </button>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosRelatorio.map((order) => (
                    <tr key={order.id_order}>
                      <td>{order.id_order}</td>
                      <td>{formatDate(order.date)}</td>
                      <td>R$ {order.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

 {/* Modal de Relatório de Itens */}
 <Modal
  isOpen={modalItensIsOpen}
  onRequestClose={handleCloseModalItens}
  contentLabel="Relatório de Itens"
  className="modal"
  overlayClassName="modal-overlay"
  ariaHideApp={false}
>
  <div id="printable-content">
    <h2>Relatório de Itens Vendidos</h2>
    <strong>
      Referente a {dataSelecionada.split("-").reverse().join("/")} até{" "}
      {dataSelecionadaend.split("-").reverse().join("/")}
    </strong>
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {consolidarItens(todosItens).map((item, index) => (
          <tr key={index}>
            <td>{item.product}</td>
            <td>{item.qtd}</td>
            <td>R$ {item.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="total-consolidado">
      <p>
        <strong>
          Valor Total: R$ {calcularValorTotal().toFixed(2)}
        </strong>
      </p>
    </div>
  </div>
  <div className="modal-buttons">
    <button className="close-btn" onClick={handleCloseModalItens}>
      Fechar
    </button>
    <button className="print-btn" onClick={() => window.print()}>
      <FontAwesomeIcon icon={faPrint} /> Imprimir
    </button>
  </div>
</Modal>


    </div>
  ); 
};

export default Relatorio;