'use client'

import { useState, useTransition } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { addNumero, updateNumero, deleteNumero, NumeroIndependencia } from './actions'

export default function NumerosClient({ initialData }: { initialData: NumeroIndependencia[] }) {
    const [data, setData] = useState<NumeroIndependencia[]>(initialData)
    const [search, setSearch] = useState('')
    const [isPending, startTransition] = useTransition()
    const [modalOpen, setModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<NumeroIndependencia | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        cod: '', setor: '', quadra: '', lote: '',
        principal: '', numero: '', prop: '', maisInforma: ''
    })

    const filteredData = data.filter(item => 
        (item.cod?.toLowerCase().includes(search.toLowerCase()) || '') ||
        (item.principal?.toLowerCase().includes(search.toLowerCase()) || '') ||
        (item.lote?.includes(search) || '')
    )

    const openAddModal = () => {
        setEditingItem(null)
        setFormData({ cod: '', setor: '', quadra: '', lote: '', principal: '', numero: '', prop: '', maisInforma: '' })
        setModalOpen(true)
    }

    const openEditModal = (item: NumeroIndependencia) => {
        setEditingItem(item)
        setFormData({
            cod: item.cod || '', setor: item.setor || '', quadra: item.quadra || '', 
            lote: item.lote || '', principal: item.principal || '', numero: item.numero || '', 
            prop: item.prop || '', maisInforma: item.maisInforma || ''
        })
        setModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este item?')) return;
        startTransition(async () => {
            const res = await deleteNumero(id)
            if (res.success) {
                setData(prev => prev.filter(n => n.id !== id))
            } else {
                alert('Erro ao excluir: ' + res.error)
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            if (editingItem) {
                const res = await updateNumero(editingItem.id, formData)
                if (res.success && res.data) {
                    setData(prev => prev.map(n => n.id === editingItem.id ? res.data : n) as NumeroIndependencia[])
                    setModalOpen(false)
                } else {
                    alert('Erro ao editar: ' + res.error)
                }
            } else {
                const res = await addNumero(formData)
                if (res.success && res.data) {
                    setData(prev => [res.data as NumeroIndependencia, ...prev])
                    setModalOpen(false)
                } else {
                    alert('Erro ao adicionar: ' + res.error)
                }
            }
        })
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Números Independência</h1>
                        <p className="text-sm text-gray-500 mt-1">Gerencie os lotes e endereços cadastrados.</p>
                    </div>
                    <button 
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm"
                    >
                        <FaPlus /> Novo Cadastro
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <FaSearch className="text-gray-400 ml-2" />
                    <input 
                        type="text" 
                        placeholder="Buscar por código, rua principal ou lote..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 py-1"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Código</th>
                                    <th className="px-6 py-4 font-semibold">Setor/Q/Lote</th>
                                    <th className="px-6 py-4 font-semibold">Rua Principal</th>
                                    <th className="px-6 py-4 font-semibold">Número</th>
                                    <th className="px-6 py-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Nenhum registro encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.cod}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.setor} / {item.quadra} / {item.lote}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.principal || '-'}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.numero || '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button 
                                                        onClick={() => openEditModal(item)}
                                                        className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 bg-blue-50 rounded-md hover:bg-blue-100"
                                                        title="Editar"
                                                    >
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors p-1.5 bg-red-50 rounded-md hover:bg-red-100"
                                                        title="Excluir"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {editingItem ? 'Editar Registro' : 'Novo Cadastro'}
                                </h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Código</label>
                                        <input required type="text" value={formData.cod} onChange={e => setFormData({...formData, cod: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Setor</label>
                                        <input type="text" value={formData.setor} onChange={e => setFormData({...formData, setor: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Quadra</label>
                                        <input type="text" value={formData.quadra} onChange={e => setFormData({...formData, quadra: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Lote</label>
                                        <input type="text" value={formData.lote} onChange={e => setFormData({...formData, lote: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Rua Principal</label>
                                        <input type="text" value={formData.principal} onChange={e => setFormData({...formData, principal: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Número</label>
                                        <input type="text" value={formData.numero} onChange={e => setFormData({...formData, numero: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Proprietário</label>
                                        <input type="text" value={formData.prop} onChange={e => setFormData({...formData, prop: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs font-semibold text-gray-600 uppercase">Mais Informações</label>
                                        <textarea value={formData.maisInforma} onChange={e => setFormData({...formData, maisInforma: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" rows={2}></textarea>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                    <button 
                                        type="button" 
                                        onClick={() => setModalOpen(false)}
                                        className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isPending}
                                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {isPending ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
