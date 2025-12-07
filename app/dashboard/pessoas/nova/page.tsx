'use server';

import { createPerson } from '@/app/actions/people';
import { redirect } from 'next/navigation';

export default async function NovaPessoaPage() {

    async function savePerson(formData: FormData) {
        'use server';

        const rawFormData = {
            tipo: formData.get('tipo'),
            nome: formData.get('nome'),
            cpfCnpj: formData.get('cpfCnpj'),
            rg: formData.get('rg'),
            telefone: formData.get('telefone'),
            email: formData.get('email'),
            endereco: formData.get('endereco'),
            numero: formData.get('numero'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            estado: formData.get('estado'),
            cep: formData.get('cep'),
        };

        await createPerson(rawFormData);
        redirect('/dashboard/pessoas');
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Nova Pessoa</h1>

            <form action={savePerson} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Pessoa</label>
                        <select name="tipo" className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="FISICA">Pessoa Física</option>
                            <option value="JURIDICA">Pessoa Jurídica</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Completo / Razão Social</label>
                        <input type="text" name="nome" required className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPF / CNPJ</label>
                        <input type="text" name="cpfCnpj" required className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">RG / Inscrição Estadual</label>
                        <input type="text" name="rg" className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="text" name="telefone" className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Endereço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Logradouro</label>
                            <input type="text" name="endereco" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input type="text" name="numero" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bairro</label>
                            <input type="text" name="bairro" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cidade</label>
                            <input type="text" name="cidade" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input type="text" name="estado" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CEP</label>
                            <input type="text" name="cep" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
