'use client'
import { useState } from 'react';

export default function ServidorForm({ servidor }) {
  const [form, setForm] = useState({
    nome: servidor?.nome || '',
    cargo: servidor?.cargo || '',
    sexo: servidor?.sexo || '',
    setor: servidor?.setor || '',
    telefone: servidor?.telefone || '',
    nascimento: servidor?.nascimento || '',
    image: servidor?.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = servidor ? 'PUT' : 'POST';
    const endpoint = servidor ? `/api/servidor?id=${servidor._id}` : '/api/servidor';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        alert('Servidor salvo com sucesso!');
      } else {
        alert('Erro ao salvar servidor');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar servidor');
    }
  };

  const pegarData = async () => {
    const response = await fetch('/api/servidor');
    const {data} = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">{servidor ? 'Editar Servidor' : 'Cadastrar Servidor'}</h2>
      
      <input
        type="text"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome"
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="cargo"
        value={form.cargo}
        onChange={handleChange}
        placeholder="Cargo"
        className="w-full p-2 border rounded"
      />

      <select
        name="sexo"
        value={form.sexo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Sexo</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select>

      <input
        type="text"
        name="setor"
        value={form.setor}
        onChange={handleChange}
        placeholder="Setor"
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="telefone"
        value={form.telefone}
        onChange={handleChange}
        placeholder="Telefone"
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="nascimento"
        value={form.nascimento}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Link da Imagem"
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {servidor ? 'Salvar Alterações' : 'Cadastrar Servidor'}
      </button>
    </form>
  );
}
