'use client';

import { useState, useMemo } from 'react';
import VerEmpresa from '../components/VerEmpresa';

export default function EmpresasList({ initialData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search term
    const filteredData = useMemo(() => {
        return initialData.filter((item) =>
            item.empresa.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [initialData, searchTerm]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full md:w-2/3 max-h-[80vh] flex flex-col space-y-3">
            <input
                className="w-full p-2 border border-gray-600 rounded-xl"
                onChange={handleSearchChange}
                value={searchTerm}
                autoFocus
                type="text"
                placeholder="🔍 Procurar empresa"
            />

            <div className="overflow-y-auto pr-2 flex-grow">
                <ul className="space-y-3">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((e, index) => {
                            const originalIndex = initialData.indexOf(e);
                            const colorir = originalIndex % 2 === 0 ? "bg-white" : "bg-gray-100";
                            return (
                                <div
                                    key={index} // Using index as key is acceptable here for simple display list, but unique ID is better if available
                                    className={`${colorir} hover:bg-blue-50 transition rounded-xl shadow-sm border border-gray-200`}
                                >
                                    <VerEmpresa cor={colorir} dadosEmpresa={e} />
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            Nenhum dado encontrado.
                        </p>
                    )}
                </ul>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-200 mt-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-100"
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-100"
                    >
                        Próxima
                    </button>
                </div>
            )}
        </div>
    );
}
