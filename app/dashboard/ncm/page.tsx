"use client";

import { useEffect, useState } from "react";
import { getNCMS, saveNCM } from "@/app/actions/ncm";
import { Edit, Copy, Plus, X, Search, ChevronLeft, ChevronRight, Check } from "lucide-react";

type NCM = {
    id: number;
    codigo: string;
    descricao: string;
};

export default function NCMPage() {
    const [ncms, setNcms] = useState<NCM[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNcm, setEditingNcm] = useState<Partial<NCM> | null>(null);
    const [saving, setSaving] = useState(false);
    
    // Copy state
    const [copiedId, setCopiedId] = useState<number | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getNCMS();
            setNcms(data as NCM[]);
        } catch (error) {
            console.error("Erro ao carregar NCMs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter logic
    const filteredNcms = ncms.filter((ncm) => 
        ncm.codigo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ncm.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredNcms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNcms = filteredNcms.slice(startIndex, startIndex + itemsPerPage);

    // Reset page when searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const copiarNCMS = async (ncm: NCM) => {

        await navigator.clipboard.writeText(ncm.codigo);
        setCopiedId(ncm.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const copiarDescricao = async (ncm: NCM) => {
        await navigator.clipboard.writeText(ncm.descricao);
        setCopiedId(ncm.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleOpenModal = (ncm?: NCM) => {
        if (ncm) {
            setEditingNcm(ncm);
        } else {
            setEditingNcm({ codigo: "", descricao: "" });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNcm(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(e.currentTarget);
            await saveNCM(formData);
            await loadData();
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao salvar NCM:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col bg-gray-500 p-4 ">
            <div className="mx-auto w-full max-w-5xl">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">NCM</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Gerencie os NCMs utilizados na emissão de Nota Fiscal Eletrônica.
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Novo NCM
                    </button>
                </div>

                {/* Search & Filter Section */}
                <div className="bg-white dark:bg-gray-400 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Pesquisar por código ou descrição..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-gray-50 dark:bg-gray-900/50 transition-all" 
                        />
                    </div>
                    <div className="flex items-center text-sm text-gray-500 whitespace-nowrap px-2">
                        {filteredNcms.length} {filteredNcms.length === 1 ? 'resultado' : 'resultados'}
                    </div>
                </div>

                {/* List Section (Overflow Div) */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden">
                    
                    {/* List Header (Hidden on small screens) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        <div className="col-span-3">Código NCM</div>
                        <div className="col-span-7">Descrição</div>
                        <div className="col-span-2 text-right">Ações</div>
                    </div>

                    <div className="flex flex-col h-[55vh] overflow-y-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                <p>Carregando NCMs...</p>
                            </div>
                        ) : paginatedNcms.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                                <Search size={48} className="text-gray-300 mb-4" />
                                <p className="text-lg font-medium text-gray-600">Nenhum NCM encontrado</p>
                                <p className="text-sm">Tente ajustar seus termos de pesquisa.</p>
                            </div>
                        ) : (
                            <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700/50">
                                {paginatedNcms.map((ncm) => (
                                    <li key={ncm.id} className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 hover:bg-blue-50/50 dark:hover:bg-gray-700/30 transition-colors items-start md:items-center">
                                        
                                        <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                                            <span className="font-mono font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                                                {ncm.codigo}
                                            </span>
                                            <button 
                                                onClick={() => copiarNCMS(ncm)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                                title="Copiar NCM"
                                            >
                                                {copiedId === ncm.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                        
                                        <div className="col-span-1 items-center  md:col-span-7 text-sm text-gray-700 dark:text-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-gray-50 dark:bg-gray-900/50 transition-all line-clamp-2 md:line-clamp-none font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                                            {ncm.descricao}
                                            <button 
                                                onClick={() => copiarDescricao(ncm)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                                title="Copiar Descrição"
                                            >
                                                {copiedId === ncm.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                        
                                        <div className="col-span-1 md:col-span-2 flex items-center justify-end md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-2 md:mt-0">
                                            <button 
                                                onClick={() => handleOpenModal(ncm)}
                                                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md transition-colors"
                                            >
                                                <Edit size={14} />
                                                Editar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* Pagination */}
                    {!loading && filteredNcms.length > 0 && (
                        <div className="border-t border-gray-100 dark:border-gray-700 p-4 bg-gray-50/50 dark:bg-gray-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-sm text-gray-500">
                                Mostrando <span className="font-medium text-gray-900 dark:text-white">{startIndex + 1}</span> a <span className="font-medium text-gray-900 dark:text-white">{Math.min(startIndex + itemsPerPage, filteredNcms.length)}</span> de <span className="font-medium text-gray-900 dark:text-white">{filteredNcms.length}</span> resultados
                            </span>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                                        // Simple logic to show pages around current page
                                        let pageNum = currentPage;
                                        if (totalPages <= 5) pageNum = idx + 1;
                                        else if (currentPage <= 3) pageNum = idx + 1;
                                        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + idx;
                                        else pageNum = currentPage - 2 + idx;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                                                    currentPage === pageNum 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Overlay & Container */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                            
                            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {editingNcm?.codigo && editingNcm.id ? "Editar NCM" : "Novo NCM"}
                                </h3>
                                <button 
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5">
                                
                                {editingNcm?.id && (
                                    <input type="hidden" className="text-white" name="id" value={editingNcm.id} />
                                )}

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="codigo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Código NCM <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="codigo"
                                        name="codigo" 
                                        required
                                        placeholder="Ex: 0101.21.00"
                                        defaultValue={editingNcm?.codigo || ""}
                                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white focus:border-blue-500 bg-white dark:bg-gray-900 transition-all font-mono"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="descricao" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Descrição <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        id="descricao"
                                        name="descricao" 
                                        required
                                        rows={4}
                                        placeholder="Descreva o produto..."
                                        defaultValue={editingNcm?.descricao || ""}
                                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-gray-900 transition-all resize-none"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button 
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Salvando...
                                            </>
                                        ) : (
                                            "Salvar NCM"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}