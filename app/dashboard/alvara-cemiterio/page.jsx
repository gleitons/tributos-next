"use client";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useState } from "react";
import Head from "next/head";



export default function Page() {
  const contentRef = useRef(null);
  
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [ano, setAno] = useState(new Date().getFullYear())
  const [protocolo, setProtocolo] = useState('000')
  const [solicitante, setSolicitante] = useState(null);
  const [genero, setGenero] = useState('Selecione Gênero');
  const [cpf, setCpf] = useState('');
  const [referente, setReferente] = useState(null);
  const [area, setArea] = useState(2);
  const [hoje, setHoje] = useState(() => {
    const dataAtual = new Date();
    return dataAtual.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'
  });
  const [local, setLocal] = useState("Cemitério Parque da Saudade");
  const [titulo, setTitulo] = useState("ALVARA CEMITÉRIO - CONTRUÇÃO")





  const fundo = {
    backgroundImage: "url(/limpo-fundo-5.jpg)",
    backgroundSize: "cover",
  };
  const fontes = {
    font: "Arial, sans-serif",
  };
  const upper = (nome) => {
    return nome.split(' ').map(texto => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()).join(' ')
  }
  const carregaAno = (e) => {
    setAno(e.target.value)
  }
  const carregaProto = (e) => {
    setProtocolo(e.target.value)
  }

  const gereGenero = (e) => {
    let index = e.target.selectedIndex; // Obtém o índice da opção selecionada
    if (index == 0) {
      index = 'Selecione Gênero'
    } else if (index == 1) {
      index = 'Sr.:'
    } else {
      index = 'Srª.:'
    }
    setGenero(index);
  }


  const insereCPF = (e) => {
    setCpf(e.target.value)
  }

  const geradorUpper = (texto) => {
    return texto.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }
  const insereRefe = (e) => {
    setReferente(geradorUpper(e.target.value))
  }

  const insereArea = (e) => {
    setArea(e.target.value)
  }

  const formatarData = (data) => {
    if (!(data instanceof Date)) {
      data = new Date(data);
    }

    // Adiciona um dia à data
    data.setDate(data.getDate() + 1);

    const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
    return data.toLocaleDateString('pt-BR', opcoes);
  };

  const handleDateChange = (e) => {
    setHoje(e.target.value); // Atualiza o estado com o valor selecionado
  };

  const insereLocal = (e) => {
    setLocal(e.target.value)
  }

  const load = (e) => {
    const solicita = upper(e.target.value)
    setSolicitante(solicita)
    geradorTitulo()

  }
  const geradorTitulo = () => {
    setTitulo(<>Alvará de Construção - {solicitante} - Túmulo {referente}</>)
  }

  return (
    <div>
      <head>
        <title>{titulo}</title>
      </head>
      <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Solicitação de Alvará de Construção - Cemitério</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Ano:</label>
            <input
              onChange={carregaAno}
              value={ano}
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: 2025"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Protocolo:</label>
            <input
              onChange={carregaProto}
              value={protocolo}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: 0002"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Solicitante:</label>
            <input
              onChange={load}
              value={solicitante}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: Nome Completo do Solicitante"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Gênero:</label>
            <select onChange={gereGenero} className="p-2 border border-gray-300 rounded">
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>

          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">CPF:</label>
            <input
              onChange={insereCPF}
              value={cpf}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: 000.000.000-00"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Referência do Túmulo:</label>
            <input
              onChange={insereRefe}
              value={referente}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: Nome Completo do Falecido"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Área:</label>
            <input
              onChange={insereArea}
              value={area}
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: 2"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Data:</label>
            <input
              onChange={handleDateChange}
              value={hoje}
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: Selecione a data"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-semibold mr-4">Local:</label>
            <input
              onChange={insereLocal}
              value={local}
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="ex: Cemitério Parque da Saudade"
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={() => reactToPrintFn()}>Imprimir</button>
      </div>


      <div className="w-[210mm] py-3 h-[297mm]" ref={contentRef}>
        <div className="relative h-[550px] p-6" style={fundo}>
          <div className="flex font-bold justify-between w-[220px] absolute top-[181px] left-72">
            <h2>{ano}</h2>
            <h2>{protocolo}</h2>
          </div>
          <div
            style={fontes}
            className="absolute text-xl p-20 left-0   text-justify top-[160px]"
          >
            <p>
              Solicitação da <strong>{genero} {solicitante} </strong>, CPF:
              <strong> {cpf} </strong>, referente à construção de um túmulo destinado a
              <strong> {referente}</strong>. O terreno está localizado no
              <strong> {local}</strong>, com uma área de <strong>{area} m²</strong>, conforme área
              disponibilizado pela <strong>Prefeitura Municipal de Lagoa dos Patos - MG.</strong>
            </p>

            <p>Lagoa dos Patos, <strong> {formatarData(hoje)}. </strong></p>

            <p className=" mt-4 italic">
              ________________________________ <br />
              Serviços da Fazenda
            </p>
          </div>
        </div>
        <div className="relative h-[550px] p-6" style={fundo}>
          <div className="flex font-bold justify-between w-[220px] absolute top-[181px] left-72">
            <h2>{ano}</h2>
            <h2>{protocolo}</h2>
          </div>
          <div
            style={fontes}
            className="absolute text-xl p-20 left-0   text-justify top-[160px]"
          >
            <p>
              Solicitação da <strong>{genero} {solicitante} </strong>, CPF:
              <strong> {cpf} </strong>, referente à construção de um túmulo destinado a
              <strong> {referente}</strong>. O terreno está localizado no
              <strong> {local}</strong>, com uma área de <strong>{area} m²</strong>, conforme área
              disponibilizado pela <strong>Prefeitura Municipal de Lagoa dos Patos - MG.</strong>
            </p>

            <p>Lagoa dos Patos, <strong> {formatarData(hoje)}. </strong></p>

            <p className=" mt-4 italic">
              ________________________________ <br />
              Serviços da Fazenda
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}
