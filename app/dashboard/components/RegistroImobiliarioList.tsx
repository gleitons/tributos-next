"use client";
import { useState } from "react";

interface RegistroImobiliario {
  matricula: string;
  referencia_anterior: string;
  lote_numero: string;
  codigo_setor: string;
  codigo_quadra: string;
  codigo_lote: string;
  proprietario: string;
  rua_nome: string;
  bairro_descricao: string;
  lote_area: string;
  valor_venal_terreno: string;
}

interface Props {
  registro: RegistroImobiliario;
  onClose: () => void;
}

const RegistroImobiliarioCard: React.FC<Props> = ({ registro, onClose }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96 z-50"
      style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4 text-center">
        Detalhes do Registro
      </h2>
      <p className="text-gray-700">
        <strong>Matrícula:</strong> {registro.matricula}
      </p>
      <p className="text-gray-700">
        <strong>Proprietário:</strong> {registro.proprietario}
      </p>
      <p className="text-gray-700">
        <strong>Lote Número:</strong> {registro.lote_numero}
      </p>
      <p className="text-gray-700">
        <strong>Rua:</strong> {registro.rua_nome}
      </p>
      <p className="text-gray-700">
        <strong>Bairro:</strong> {registro.bairro_descricao}
      </p>
      <p className="text-gray-700">
        <strong>Área do Lote:</strong> {registro.lote_area} m²
      </p>
      <p className="text-gray-700">
        <strong>Valor Venal do Terreno:</strong> R${" "}
        {registro.valor_venal_terreno}
      </p>
      <p className="text-gray-700">Valor Venal Terreno: {registro.valor_venal_terreno}</p>
    </div>
  );
};

export default RegistroImobiliarioCard;
