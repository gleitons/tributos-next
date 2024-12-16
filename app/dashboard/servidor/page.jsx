'use client'
import { useState } from 'react';

export default function FormularioServidor() {
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    sexo: '',
    setor: '',
    telefone: '',
    nascimento: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/servidores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = response.ok ? await response.json() : null;

      if (response.ok) {
        alert('Servidor cadastrado com sucesso!');
        setFormData({
          nome: '',
          cargo: '',
          sexo: '',
          setor: '',
          telefone: '',
          nascimento: '',
          image: '',
        });
      } else {
        console.error('Erro ao cadastrar servidor:', result ? result.error : 'Resposta vazia');
        alert('Erro ao cadastrar servidor.');
      }
    } catch (error) {
      console.error('Erro na conexão:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Cadastro de Servidor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o nome"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o cargo"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Sexo</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Setor</label>
          <input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o setor"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o telefone"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Data de Nascimento</label>
          <input
            type="date"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Imagem (URL)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a URL da imagem"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 font-medium hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
