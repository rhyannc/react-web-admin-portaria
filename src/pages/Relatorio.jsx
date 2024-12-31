// src/components/Relatorio.js
import React, { useState, useEffect } from 'react';

import api from '../services/api'; // Importa a instância do Axios

const Relatorio = () => {
  const [locais, setLocais] = useState([]);
  const [localSelecionado, setLocalSelecionado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await api.get('/listarlocal');
        setLocais(response.data);
      } catch (error) {
        console.error(error);
        setErro('Erro ao carregar a lista de locais.');
      }
    };

    fetchLocais();
  }, []);

  const handleConsultar = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    if (!localSelecionado || !dataSelecionada) {
      setErro('Por favor, selecione um local e uma data.');
      return;
    }

    setCarregando(true);
    setErro('');
    setMostrarResultados(false);

    try {
      const dataFormatada = dataSelecionada.split('-').reverse().join('/'); // Formato DD/MM/AAAA

      const response = await api.post('/listarorderlocaldata', {
        id_local: localSelecionado,
        dtstart: dataFormatada,
      });
      setDadosRelatorio(response.data);
      setMostrarResultados(true);
    } catch (error) {
      console.error(error);
      setErro('Erro ao buscar os dados do relatório.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="content">
      <div className="container">
        <h2>Relatório</h2>
        {erro && <p className="mensagem-erro">{erro}</p>}
        


        <form onSubmit={handleConsultar} className="relatorio-form">
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="local">Local:</label>
      <select
        id="local"
        value={localSelecionado}
        onChange={(e) => setLocalSelecionado(e.target.value)}
        required
      >
        <option value="">Selecione um local</option>
        {locais.map((local) => (
          <option key={local.id_local} value={local.id_local}>
            {local.name}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="data">Data:</label>
      <input
        type="date"
        id="data"
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)}
        required
      />
    </div>
  </div>
  <button type="submit" disabled={carregando}>
    {carregando ? 'Consultando...' : 'Consultar'}
  </button>
</form>




        {mostrarResultados && (
          <div className="resultados">
            <h3>Resultados</h3>
            {dadosRelatorio.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Início</th>
                    <th>Pronto</th>
                    <th>Entregue</th>
                    <th>Tempo</th>
                  </tr>
                </thead>
                <tbody>
                  {dadosRelatorio.map((item, index) => (
                    <tr key={index}>
                      <td>{item.number}</td>
                      <td>{item.start}</td>
                      <td>{item.pronto}</td>
                      <td>{item.entregue}</td>
                      <td>{item.tempogasto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum dado encontrado para os critérios selecionados.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Relatorio;