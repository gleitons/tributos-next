"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import QRCode from "qrcode";

// Types
type User = {
    cpf: string;
    nome: string;
    email: string;
};

type ItbiRequest = {
    id: string;
    date: string;
    solicitante: string;
    ufm?: number;
    ano?: number;
    adquirente?: string;
    transmitente?: string;
    areaNegociada: string;
    descricao?: string;
    naturezaTransmissao?: string;
    tipoImovel?: string;
    qualidadeImovel?: string;
    condicoesImovel?: string;
    sessaoDividaAtiva?: string;
    valorTransacao?: string;
    valorCalculado: string;
    status: string;
};

// Utils
const formatCpf = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
};

const formatMoney = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) return "";
    const number = parseInt(cleanValue, 10) / 100;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(number);
};

export default function ItbiRuralPage() {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // Login / Register state
    const [loginCpf, setLoginCpf] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [regNome, setRegNome] = useState("");
    const [regEmail, setRegEmail] = useState("");

    // Dashboard state
    const [requests, setRequests] = useState<ItbiRequest[]>([]);
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editNome, setEditNome] = useState("");
    const [editEmail, setEditEmail] = useState("");

    const handleSaveProfile = () => {
        if (!currentUser) return;
        if (!editNome || !editEmail) return alert("Preencha todos os campos.");
        const users = JSON.parse(localStorage.getItem("itbi_users") || "{}");
        const updatedUser = { ...currentUser, nome: editNome, email: editEmail };
        users[currentUser.cpf] = updatedUser;
        localStorage.setItem("itbi_users", JSON.stringify(users));
        setCurrentUser(updatedUser);
        setIsEditingProfile(false);
        alert("Dados atualizados com sucesso!");
    };

    // Variaveis Reais do Sistema (API)
    const [valorUfm, setValorUfm] = useState(4.63);
    const [anoVigente, setAnoVigente] = useState(new Date().getFullYear());

    // Form State
    const [solicitante, setSolicitante] = useState("");
    const [adquirente, setAdquirente] = useState("");
    const [transmitente, setTransmitente] = useState("");
    const [areaNegociada, setAreaNegociada] = useState("");
    const [descricao, setDescricao] = useState("");
    const [naturezaTransmissao, setNaturezaTransmissao] = useState("");
    const [tipoImovel, setTipoImovel] = useState("");
    const [qualidadeImovel, setQualidadeImovel] = useState("");
    const [condicoesImovel, setCondicoesImovel] = useState("");
    const [sessaoDividaAtiva, setSessaoDividaAtiva] = useState("");
    const [valorTransacao, setValorTransacao] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [showItensNecessarios, setShowItensNecessarios] = useState(false);
    const abreDocsNecessarios = (e: React.FormEvent) => {
        e.preventDefault();
        setShowItensNecessarios(!showItensNecessarios);
    }
    useEffect(() => {
        // Buscar o UFM Atualizado da API
        fetch('/api/ufm').then(res => res.json()).then(data => {
            if (data && data.length > 0) {
                // Pegar o ano vigente ou o maior ano
                const v = data.reduce((prev: any, current: any) => (prev.ano > current.ano) ? prev : current);
                setValorUfm(v.valor);
                setAnoVigente(v.ano);
            }
        }).catch(err => console.error(err));

        // Check for logged user on mount
        const storedUserId = localStorage.getItem("itbi_logged_cpf");
        if (storedUserId) {
            const users = JSON.parse(localStorage.getItem("itbi_users") || "{}");
            if (users[storedUserId]) {
                setCurrentUser(users[storedUserId]);
                fetchUserRequests(storedUserId);
            }
        }
        setLoading(false);
    }, []);

    const fetchUserRequests = async (cpf: string) => {
        try {
            const res = await fetch(`/api/itbi-rural-solicitacao?usuario=${cpf}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                // Mapear dados do BD para o objeto Requests do Front-End (caso tenha q formatar algo)
                setRequests(data.map((r: any) => ({
                    id: r.protocolo || r.id.toString(),
                    date: r.dataCriacao,
                    solicitante: r.solicitante,
                    areaNegociada: r.areaTerreno,
                    valorCalculado: formatMoney((r.valorItbi * 100).toFixed(0).padStart(3, '0')),
                    adquirente: r.adquirente,
                    transmitente: r.transmitente,
                    descricao: r.descricaoImovel,
                    naturezaTransmissao: r.natureza,
                    tipoImovel: r.tipoImovel,
                    qualidadeImovel: r.qualidadeImovel,
                    condicoesImovel: r.condicaoImovel,
                    sessaoDividaAtiva: r.situacaoTransmitente,
                    valorTransacao: formatMoney((r.valorTransacao * 100).toFixed(0).padStart(3, '0')),
                    status: r.status || 'Pendente',
                    observacoes: r.observacoes || ''
                })));
            }
        } catch (error) {
            console.error("Erro ao puxar requests:", error);
            // Backup LocalStorage in fallback
            const allRequests = JSON.parse(localStorage.getItem("itbi_requests") || "{}");
            setRequests(allRequests[cpf] || []);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCpf = loginCpf.replace(/\D/g, "");
        if (cleanCpf.length !== 11) return alert("CPF inválido");

        const users = JSON.parse(localStorage.getItem("itbi_users") || "{}");
        if (users[cleanCpf]) {
            // User exists locally
            setCurrentUser(users[cleanCpf]);
            localStorage.setItem("itbi_logged_cpf", cleanCpf);
            fetchUserRequests(cleanCpf);
        } else {
            // Verifica no banco de dados se esse CPF já tem solicitações
            try {
                const res = await fetch(`/api/itbi-rural-solicitacao?usuario=${cleanCpf}`);
                const data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    // Já existe na base de dados, mas não estava no localStorage (ex: limpou cache ou outro PC)
                    const nomeTiradoDaBase = data[0].solicitante;
                    const restoredUser = { cpf: cleanCpf, nome: nomeTiradoDaBase, email: "" };
                    users[cleanCpf] = restoredUser;
                    localStorage.setItem("itbi_users", JSON.stringify(users));
                    setCurrentUser(restoredUser);
                    localStorage.setItem("itbi_logged_cpf", cleanCpf);

                    // Como já rodamos o fetch, não precisamos rodar fetchUserRequests() dnv se apenas remapearmos aqui:
                    setRequests(data.map((r: any) => ({
                        id: r.protocolo || r.id.toString(),
                        date: r.dataCriacao,
                        solicitante: r.solicitante,
                        areaNegociada: r.areaTerreno,
                        valorCalculado: formatMoney((r.valorItbi * 100).toFixed(0).padStart(3, '0')),
                        adquirente: r.adquirente,
                        transmitente: r.transmitente,
                        descricao: r.descricaoImovel,
                        naturezaTransmissao: r.natureza,
                        tipoImovel: r.tipoImovel,
                        qualidadeImovel: r.qualidadeImovel,
                        condicoesImovel: r.condicaoImovel,
                        sessaoDividaAtiva: r.situacaoTransmitente,
                        valorTransacao: formatMoney((r.valorTransacao * 100).toFixed(0).padStart(3, '0')),
                        status: r.status || 'Pendente',
                        observacoes: r.observacoes || ''
                    })));
                } else {
                    // Realmente não existe, precisa registrar
                    setIsRegistering(true);
                }
            } catch (error) {
                console.error("Erro ao validar login no BD:", error);
                setIsRegistering(true);
            }
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCpf = loginCpf.replace(/\D/g, "");
        if (!regNome || !regEmail) return alert("Preencha todos os campos.");

        const users = JSON.parse(localStorage.getItem("itbi_users") || "{}");
        const newUser: User = { cpf: cleanCpf, nome: regNome, email: regEmail };
        users[cleanCpf] = newUser;
        localStorage.setItem("itbi_users", JSON.stringify(users));
        localStorage.setItem("itbi_logged_cpf", cleanCpf);

        setCurrentUser(newUser);
        fetchUserRequests(cleanCpf);
        setIsRegistering(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("itbi_logged_cpf");
        setCurrentUser(null);
        setLoginCpf("");
        setRequests([]);
        setIsCreatingForm(false);
    };

    // Bold insert helper
    const handleBoldInsert = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            const text = selection.toString();
            setter((prev) => prev.replace(text, `<b>${text}</b>`));
            // alert("Texto marcado com bold! Substituiremos os \* pelo negrito na exibição.");
        } else {
            alert("Selecione um texto primeiro para inserir negrito.");
        }
    };

    const handleDownloadPDF = async (req: ItbiRequest) => {

        const doc = new jsPDF();

        // gerar QR code com link de validação
        const qrCodeData = await QRCode.toDataURL(
            `https://tributos.netlify.app/itbi/validar/${req.id}`
        );

        // brasão (imagem precisa estar em base64 ou url convertida)
        const brasao = "/brasao-lagoa-dos-patos-mg.webp";

        // ------------------------
        // CABEÇALHO
        // ------------------------

        doc.addImage(brasao, "WEBP", 15, 10, 25, 25);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("GUIA DE INFORMAÇÃO DE I.T.B.I", 105, 15, { align: "center" });

        doc.setFontSize(12);
        doc.text("PREFEITURA DE LAGOA DOS PATOS - MG", 105, 22, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(
            "SECRETARIA MUNICIPAL DA FAZENDA",
            105,
            28,
            { align: "center" }
        );

        doc.text(
            "CONTATO: (38) 3426-0398 | tributos@lagoadospatos.mg.gov.br",
            105,
            33,
            { align: "center" }
        );

        // QR CODE
        doc.addImage(qrCodeData, "PNG", 170, 10, 25, 25);

        // Linha separadora
        doc.setLineWidth(0.5);
        doc.line(14, 40, 196, 40);

        // ------------------------
        // PROTOCOLO
        // ------------------------

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text(
            `PROTOCOLO Nº ${req.id.toUpperCase()}`,
            105,
            48,
            { align: "center" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            `Data da Solicitação: ${new Date(req.date).toLocaleDateString()}`,
            14,
            60
        );

        doc.text(`Solicitante: ${req.solicitante.toUpperCase()}`, 14, 66);

        // ------------------------
        // REMOVER TAGS HTML
        // ------------------------

        const stripBold = (html: string) =>
            html ? html.replace(/<\/?b>/g, "") : "-";

        // ------------------------
        // TABELA
        // ------------------------

        autoTable(doc, {
            startY: 72,
            theme: "grid",
            styles: {
                fontSize: 9,
                cellPadding: 2,
                halign: "left",
                valign: "middle",

            },
            head: [["Campo", "Informação"]],
            body: [
                ["Adquirente", stripBold(req.adquirente || "-")],
                ["Transmitente", stripBold(req.transmitente || "-")],
                ["Área Negociada", stripBold(req.areaNegociada)],
                ["Descrição do Imóvel", stripBold(req.descricao || "-")],
                ["Natureza da Transmissão", stripBold(req.naturezaTransmissao || "-")],
                ["Tipo de Imóvel", stripBold(req.tipoImovel || "-")],
                ["Qualidade do Imóvel", stripBold(req.qualidadeImovel || "-")],
                ["Condições do Imóvel", stripBold(req.condicoesImovel || "-")],
                ["Sessão de Dívida Ativa", stripBold(req.sessaoDividaAtiva || "AGUARDANDO SETOR DE TRIBUTOS DE LAGOA DOS PATOS MG")],
                ["Valor da Transação", stripBold(req.valorTransacao || "-")],
                ["Estimativa de ITBI", req.valorCalculado + " + Taxa de Expediente"],
            ]
        });

        // ------------------------
        // RODAPÉ
        // ------------------------

        const pageHeight = doc.internal.pageSize.height;

        doc.setFontSize(10);
        doc.text(
            `ATENÇÃO: ITBI rural é 2% sobre o valor da transação. Adiciona-se a taxa de Expediente no valor de 2 UFMs. R$ ${valorUfm * 2}`,
            105,
            pageHeight - 35,
            { align: "center" }
        );
        doc.setFontSize(8);
        doc.text(
            "Documento gerado automaticamente pelo Sistema de controle local do Tributário Municipal.",
            105,
            pageHeight - 20,
            { align: "center" }
        );

        doc.text(
            "A autenticidade deste documento pode ser verificada através do QR Code - O protocolo interno poderá ser alterado.",
            105,
            pageHeight - 15,
            { align: "center" }
        );

        doc.text(
            `Prefeitura Municipal de Lagoa dos Patos - MG • ${new Date().getFullYear()}`,
            105,
            pageHeight - 10,
            { align: "center" }
        );

        // ------------------------

        doc.save(`protocolo_itbi_${req.id}.pdf`);
    };

    const calculateITBI = (valStr: string) => {
        const cleanValue = valStr.replace(/\D/g, "");
        if (!cleanValue) return 0;
        const numValue = parseInt(cleanValue, 10) / 100;
        // Vamos supor que no ITBI Rural, o imposto seja 2% do valor da transacao (regra comum)
        return numValue * 0.02;
    };

    const handleSubmitRequest = async () => {
        if (!currentUser) return;

        const calculatedTax = calculateITBI(valorTransacao);

        const newReq = {
            protocolo: "RUR-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
            usuario: currentUser.cpf,
            solicitante,
            valorUfm: valorUfm,
            ano: anoVigente,
            adquirente,
            transmitente,
            areaTerreno: areaNegociada,
            descricaoImovel: descricao,
            natureza: naturezaTransmissao,
            tipoImovel: tipoImovel,
            qualidadeImovel: qualidadeImovel,
            condicaoImovel: condicoesImovel,
            situacaoTransmitente: sessaoDividaAtiva,
            valorTransacao: parseFloat(valorTransacao.replace(/\D/g, '')) / 100,
            valorItbi: calculatedTax,
            taxaExpediente: valorUfm, // 1 UFM igual na regra
            observacoes: observacoes
        };

        try {
            await fetch('/api/itbi-rural-solicitacao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReq)
            });
            fetchUserRequests(currentUser.cpf);
        } catch (err) {
            console.error("Erro ao salvar no bd", err);
        }

        setIsCreatingForm(false);
        setShowPreview(false);

        // Reset fields
        setSolicitante(""); setAdquirente(""); setTransmitente(""); setAreaNegociada(""); setDescricao("");
        setNaturezaTransmissao(""); setTipoImovel(""); setQualidadeImovel(""); setCondicoesImovel("");
        setSessaoDividaAtiva(""); setValorTransacao(""); setObservacoes("");
    };

    if (loading) return <div className="p-8 text-center">Carregando...</div>;

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">ITBI Rural - Acesso</h1>

                    {!isRegistering ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Seu CPF</label>
                                <input
                                    type="text"
                                    value={loginCpf}
                                    onChange={(e) => setLoginCpf(formatCpf(e.target.value))}
                                    maxLength={14}
                                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                                Entrar / Cadastrar
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <p className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                                Parece que este é seu primeiro acesso. Conclua seu cadastro para continuar.
                            </p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                <input type="text" value={loginCpf} readOnly className="w-full border-gray-300 rounded-lg p-3 border bg-gray-100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input type="text" value={regNome} onChange={(e) => setRegNome(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button type="button" onClick={() => setIsRegistering(false)} className="w-1/3 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition">
                                    Voltar
                                </button>
                                <button type="submit" className="w-2/3 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                                    Finalizar Cadastro
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Dashboard */}
                <div className="max-w-4xl mx-auto p-4">
                    <div className="border-2 border-gray-300 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center md:items-center justify-between bg-white shadow-sm font-sans gap-4">

                        {/* Brasão */}
                        <div className="flex-shrink-0 w-full md:w-32 flex justify-center">
                            <Image
                                src="/brasao-lagoa-dos-patos-mg.webp"
                                alt="Brasão Lagoa dos Patos"
                                width={100}
                                height={100}
                                className="h-20 md:h-24 object-contain"
                            />
                        </div>

                        {/* Texto central */}
                        <div className="flex-grow text-center px-2 md:px-4">
                            <h1 className="text-xl md:text-2xl font-black tracking-tight text-black mb-1">
                                GUIA DE INFORMAÇÃO DE I.T.B.I
                            </h1>

                            <h2 className="text-base md:text-lg font-bold text-black uppercase tracking-wide">
                                PREFEITURA DE LAGOA DOS PATOS MG
                            </h2>

                            <p className="text-xs md:text-sm font-medium text-gray-800 mt-1">
                                CONTATO: (38) 3426-0398 | tributos@lagoadospatos.mg.gov.br
                            </p>

                            {/* <p className="text-lg md:text-2xl font-black text-black mt-2">
                                PROTOCOLO: 445/2024
                            </p> */}

                            <div className="mt-2 text-[10px] md:text-xs font-bold text-black border-t border-gray-200 pt-1 uppercase">
                                SECRETARIA DA FAZENDA – DIVISÃO DE CADASTRO - CNPJ: 16.901.381/0001-00
                            </div>
                        </div>

                        {/* QR Code */}
                        {/* <div className="flex flex-row items-center gap-2 justify-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-black flex items-center justify-center rounded-sm">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-1">
                                    <Image src="/qr-vtn.png" alt="QR Code" width={100} height={100} />
                                </div>
                            </div>

                            <div className="hidden md:flex text-[10px] font-bold text-black leading-tight [writing-mode:vertical-rl] rotate-180 items-center">
                                Código Tributário Municipal
                            </div>
                        </div> */}

                    </div>
                </div>
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm mb-6 flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Painel do Solicitante</h1>
                        <p className="text-gray-600">Bem-vindo(a), {currentUser.nome}</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => {
                            if (!isEditingProfile) {
                                setEditNome(currentUser.nome);
                                setEditEmail(currentUser.email);
                            }
                            setIsEditingProfile(!isEditingProfile);
                        }} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition font-medium">
                            {isEditingProfile ? "Cancelar Edição" : "Editar Meus Dados"}
                        </button>
                        <button onClick={handleLogout} className="text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition font-medium">
                            Sair
                        </button>
                    </div>
                </div>

                {isEditingProfile && (
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border-l-4 border-blue-500 transition-all">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Atualização Cadastral</h2>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                            <p className="text-sm text-yellow-800 font-medium">
                                ⚠️ <strong>Aviso Importante:</strong> O preenchimento correto dos dados é de inteira responsabilidade do solicitante. <br />
                                Confira o seu <strong>E-mail</strong> com bastante atenção, pois entraremos em contato exclusivamente por ele para envio da guia e comunicações. <strong>Responsabilidade:</strong> Embora o cartório fiscalize, a declaração inicial é do adquirente. Informar dados inverídicos para reduzir o imposto pode ser configurado como fraude fiscal.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">CPF (Não editável)</label>
                                <input type="text" value={formatCpf(currentUser.cpf)} disabled className="w-full border-gray-300 rounded-lg p-3 border bg-gray-100 text-gray-500 cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                                <input type="text" value={editNome} onChange={(e) => setEditNome(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" placeholder="Seu nome completo" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail para Contato</label>
                                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" placeholder="seu@email.com" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm">
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                )}

                {!isCreatingForm ? (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Minhas Solicitações (ITBI Rural)</h2>
                            <button
                                onClick={() => setIsCreatingForm(true)}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                            >
                                + Nova Solicitação
                            </button>
                        </div>

                        {requests.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                Nenhuma solicitação encontrada. Clique em &quot;Nova Solicitação&quot; para começar.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <div key={req.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Protocolo: #{req.id.toUpperCase()} (Número Provisório)</h3>
                                            <p className="text-sm text-gray-600">Data: {new Date(req.date).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600">Área: {req.areaNegociada} | Valor: {req.valorCalculado} (ITBI)</p>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full text-center ${req.status === 'Atendida' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {req.status === 'Atendida' ? '✅ Atendida' : '✅ Enviado'}
                                            </span>
                                            <div className="flex gap-2">
                                                <Link href={`/solicitacao/itbi-rural/${req.id}/visualizar`} className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-blue-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Visualizar
                                                </Link>
                                                <button onClick={() => handleDownloadPDF(req)} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 border border-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Baixar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b">
                            <button
                                onClick={() => setIsCreatingForm(false)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ← Voltar
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">Solicitar Guia de ITBI Rural</h2>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                            <p className="text-sm text-yellow-800 font-medium text-justify">
                                ⚠️ <strong>Aviso Importante:</strong> O preenchimento correto dos dados é de inteira responsabilidade do solicitante.
                                Confira o seu <strong>E-mail</strong> com bastante atenção, pois entraremos em contato exclusivamente por ele para envio da guia e comunicações. <strong>Responsabilidade:</strong> Embora o cartório fiscalize, a declaração inicial é do adquirente. Informar dados inverídicos para reduzir o imposto pode ser configurado como fraude fiscal.
                            </p>
                        </div>

                        {showPreview ? (
                            <div className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                    <h3 className="font-bold text-yellow-800 mb-2">Veja antes de gerar e esclarecer as dúvidas</h3>
                                    <p className="text-yellow-700 text-sm">Resumo da sua solicitação. Revise os dados abaixo com atenção antes de emitir a guia oficial. O cálculo do ITBI é estimado.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-50 p-6 rounded-lg border">
                                    <div><strong className="text-gray-600">Solicitante:</strong> <br />{solicitante}</div>
                                    <div><strong className="text-gray-600">Ano:</strong> {anoVigente} | <strong className="text-gray-600">Taxa de Expediente:</strong> R$ {valorUfm * 2}</div>

                                    <div className="md:col-span-2"><strong className="text-gray-600">Adquirente:</strong> <br />{adquirente}</div>
                                    <div className="md:col-span-2"><strong className="text-gray-600">Transmitente:</strong> <br />{transmitente}</div>
                                    <div className="md:col-span-2"><strong className="text-gray-600">Descrição do Imóvel:</strong> <br />{descricao}</div>

                                    <div><strong className="text-gray-600">Área Negociada:</strong> <br />{areaNegociada}</div>
                                    <div><strong className="text-gray-600">Natureza da Transmissão:</strong> <br />{naturezaTransmissao}</div>
                                    <div><strong className="text-gray-600">Tipo de Imóvel:</strong> <br />{tipoImovel}</div>
                                    <div><strong className="text-gray-600">Sessão de Dívida Ativa:</strong> <br />{sessaoDividaAtiva}</div>

                                    <div className="md:col-span-2 pt-2 border-t mt-2">
                                        <strong className="text-gray-600">Observações:</strong> <br />
                                        <p className="whitespace-pre-wrap">{observacoes || 'Nenhuma'}</p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 md:col-span-2 mt-2">
                                        <p className="text-lg mb-2"><strong>Valor da Transação:</strong> {valorTransacao}</p>
                                        <p className="text-md text-gray-700"><strong>Taxa de Expediente (2 UFM):</strong> {formatMoney((valorUfm * 200).toFixed(0).padStart(3, '0'))}</p>
                                        <p className="text-xl text-green-700 mt-2">Valor Calculado ITBI (Estimado ~2%): <strong>{formatMoney(((calculateITBI(valorTransacao) * 100) + (valorUfm * 200)).toFixed(0).padStart(3, '0'))}</strong></p>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-end pt-4">
                                    <button onClick={() => setShowPreview(false)} className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                                        Voltar e Editar
                                    </button>
                                    <button onClick={handleSubmitRequest} className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-lg">
                                        Confirmar e Gerar Guia
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Solicitante</label>
                                        <input type="text" value={solicitante} onChange={e => setSolicitante(e.target.value)} required placeholder="Ex: Nome do Usuario ou Solicitante" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Taxa de Expediente/ Ano</label>
                                        <div className="flex gap-2">
                                            <input type="text" disabled value={'R$ ' + (valorUfm * 2).toString().replace('.', ',')} className="w-1/2 border-gray-300 rounded-lg p-3 border bg-gray-100 text-center" />
                                            <input type="text" disabled value={anoVigente} className="w-1/2 border-gray-300 rounded-lg p-3 border bg-gray-100 text-center" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-sm font-semibold text-gray-700">Adquirente *</label>
                                        <button type="button" onClick={() => handleBoldInsert(setAdquirente)} className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">Negrito: selecione e clique</button>
                                    </div>
                                    <textarea value={adquirente} onChange={e => setAdquirente(e.target.value)} required maxLength={1555} rows={3} placeholder="Ex: NOME ADQUIRENTE, brasileiro, estado civil, profissão, Identidade, inscrito no CPF/MF sob o nº xxx.xxx.xxx-xx, residente e domiciliado na Rua..., nº..., Bairro..., Cidade/MG, CEP:xxx-xxx." className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" />
                                    <div className="text-xs text-right text-gray-500">{adquirente.length}/1555 caracteres</div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-sm font-semibold text-gray-700">Transmitente *</label>
                                        <button type="button" onClick={() => handleBoldInsert(setTransmitente)} className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">Negrito: selecione e clique</button>
                                    </div>
                                    <textarea value={transmitente} onChange={e => setTransmitente(e.target.value)} required maxLength={1555} rows={3} placeholder="Ex: NOME TRANSMITENTE, brasileiro, estado civil, profissão, Identidade, inscrito no CPF/MF sob o nº xxx.xxx.xxx-xx, residente e domiciliado na Rua..., nº..., Bairro..., Cidade/MG, CEP:xxx-xxx." className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" />
                                    <div className="text-xs text-right text-gray-500">{transmitente.length}/1555 caracteres</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Área Negociada *</label>
                                    <input type="text" value={areaNegociada} onChange={e => setAreaNegociada(e.target.value)} required placeholder="Ex: 15.65.25ha" className="w-full md:w-1/2 border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-sm font-semibold text-gray-700">Descrição do Imóvel *</label>
                                        <button type="button" onClick={() => handleBoldInsert(setDescricao)} className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">Negrito: selecione e clique</button>
                                    </div>
                                    <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required maxLength={1555} rows={3} placeholder="EX: UMA (01) PROPRIEDADE RURAL, denominada “XXX”, situada em  terras da FAZENDA XXX, XXXXXXXX de XXXX, deste município e comarca de xxxxxxx-MG, e do distrito e município de xxxxxxx-MG, com área de, REGISTRO NUMERO XXXX, Matricula, data de registro, Cartório de Registro de Imóveis de xxxxxxx-MG." className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none" />
                                    <div className="text-xs text-right text-gray-500">{descricao.length}/1555 caracteres</div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>

                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Natureza da Transmissão *</label>
                                        <select value={naturezaTransmissao} onChange={e => setNaturezaTransmissao(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none bg-white">
                                            <option value="">Selecione</option>


                                            <option value="COMPRA E VENDA">COMPRA E VENDA</option>
                                            <option value="CESSÃO DE DIREITO HEREDITÁRIO">CESSÃO DE DIREITO HEREDITÁRIO</option>
                                            {/* <option value="ISENÇÃO">ISENÇÃO DE ITBI</option> */}
                                            <option value="FUSÃO/INCORPORAÇÃO">FUSÃO, INCORPORAÇÃO, CISÃO OU EXTINÇÃO</option>
                                            <option value="ISENÇÃO DE ITBI">ISENÇÃO DE ITBI</option>
                                            <option value="DAÇÃO EM PAGAMENTO">DAÇÃO EM PAGAMENTO</option>
                                            <option value="PERMUTA">PERMUTA</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Imóvel *</label>
                                        <select value={tipoImovel} onChange={e => setTipoImovel(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none bg-white">
                                            <option value="">Selecione</option>
                                            <option value="Terreno Rural">Terreno Rural</option>
                                            <option value="Fazenda de Cultura">Fazenda de Cultura</option>
                                            <option value="Gleba de Terras">Gleba de Terras</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qualidade da Construção *</label>
                                        <select value={qualidadeImovel} onChange={e => setQualidadeImovel(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none bg-white">
                                            <option value="">Selecione</option>
                                            <option value="Não Possui">Não Possui</option>
                                            <option value="Excelente">Excelente</option>
                                            <option value="Boa">Boa</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Ruim">Ruim</option>
                                            <option value="Péssima">Péssima</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Condições do Imóvel *</label>
                                        <select value={condicoesImovel} onChange={e => setCondicoesImovel(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none bg-white">
                                            <option value="">Selecione</option>
                                            <option value="Imóvel paga ITR">Imóvel paga ITR</option>
                                            <option value="Imóvel não paga ITR">Imóvel não paga ITR</option>
                                        </select>
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Sessão de Dívida Ativa *</label>
                                        <select value={sessaoDividaAtiva} onChange={e => setSessaoDividaAtiva(e.target.value)} required className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none bg-white">
                                            <option value="">Selecione</option>
                                            <option value="Não Possui">Não Possui</option>
                                            <option value="Possui">Possui</option>
                                        </select>
                                    </div> */}
                                </div>
                                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                                    <p className=" text-sm text-justify text-red-800 font-medium">
                                        ⚠️ <strong>Aviso Importante:</strong> Veja aqui os itens necessários para abertura do processo de ITBI Rural. <br />
                                        Confira o seu <strong>E-mail</strong> com bastante atenção, pois entraremos em contato exclusivamente por ele para envio da guia e comunicações.

                                    </p>
                                    <span className="animate-pulse text-justify mt-5 text-sm text-red-800 font-medium">⚠️ <strong>Atenção:</strong> A DOCUMENTAÇÃO NECESSÁRIA, DEVERÁ SER ENVIADA PARA O E-MAIL tributos@lagoadospatos.mg.gov.br⚠️</span> <br />
                                    <button onClick={abreDocsNecessarios} className="bg-red-500 text-white px-4 py-2 rounded-lg">Ver Itens Necessários</button>
                                </div>
                                {showItensNecessarios && (
                                    <div className="bg-red-100 min-h-screen">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={abreDocsNecessarios}>Fechar</button>
                                        <div className="w-full mx-auto mt-10 bg-red-100 shadow-lg rounded-2xl p-8">

                                            <h1 className="text-3xl font-bold text-green-700 mb-6">
                                                Solicitação de ITBI Rural
                                            </h1>

                                            <p className="text-gray-600 mb-6">
                                                Confira abaixo os documentos necessários para abertura do processo de
                                                <strong>Imposto sobre Transmissão de Bens Imóveis (ITBI) Rural</strong>.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6">


                                                <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                                                    <h2 className="text-xl font-semibold text-green-800 mb-3">
                                                        Documentos do Comprador
                                                    </h2>

                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>RG e CPF ou CNH / CNPJ</li>
                                                        <li>Comprovante de estado civil</li>
                                                        <li>Comprovante de endereço</li>
                                                        <li>Contrato de compra e venda ou escritura</li>
                                                        <li>Se CNPJ dados do Procurador</li>
                                                    </ul>
                                                </div>


                                                <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                                                    <h2 className="text-xl font-semibold text-green-800 mb-3">
                                                        Documentos do Vendedor
                                                    </h2>

                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>RG e CPF ou CNH / CNPJ</li>
                                                        <li>Comprovante de estado civil</li>
                                                        <li>Certidão de casamento (se casado)</li>
                                                        <li>Se CNPJ - Dados do Procurador</li>
                                                    </ul>
                                                </div>


                                                <div className="bg-green-50 p-5 rounded-xl border border-green-200 md:col-span-2">
                                                    <h2 className="text-xl font-semibold text-green-800 mb-3">
                                                        Documentos do Imóvel Rural
                                                    </h2>

                                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                        <li>Matrícula atualizada do imóvel (emitida pelo Cartório de Registro de Imóveis)</li>
                                                        <li>CCIR – Certificado de Cadastro de Imóvel Rural</li>
                                                        <li>ITR – último comprovante de pagamento</li>
                                                        <li>CAR – Cadastro Ambiental Rural</li>
                                                        <li>Mapa ou memorial descritivo da área (quando necessário)</li>
                                                    </ul>
                                                </div>

                                            </div>


                                            <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                                <h3 className="font-semibold text-yellow-800 mb-2">
                                                    Observações
                                                </h3>

                                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                                    <li>Todos os documentos devem estar legíveis.</li>
                                                    <li>A Prefeitura poderá solicitar documentos adicionais caso necessário.</li>
                                                    <li>A análise do processo ocorrerá após entrega completa da documentação.</li>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>
                                )}

                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                    <label className="block text-sm font-bold text-gray-800 mb-2">VALOR DA TRANSAÇÃO *</label>
                                    <p className="text-xs text-gray-600 mb-4">Insira o valor negociado. Ex: R$ 1.500,50. O cálculo de ITBI (estimativa base) ocorrerá em tempo real.</p>
                                    <input
                                        type="text"
                                        value={valorTransacao}
                                        onChange={e => setValorTransacao(formatMoney(e.target.value))}
                                        required
                                        placeholder="R$ 0,00"
                                        className="w-full md:w-1/3 text-2xl font-bold border-gray-300 rounded-lg p-4 border focus:ring-2 focus:ring-blue-500 outline-none text-green-700"
                                    />
                                    {valorTransacao && (
                                        <div className="mt-4 p-4 bg-green-100 rounded-lg text-green-900 border border-green-200">
                                            <strong>Estimativa ITBI (2%):</strong> {formatMoney((calculateITBI(valorTransacao) * 100).toFixed(0).padStart(3, '0'))} + R$ {valorUfm * 2} (Taxa de Expediente) = <strong>{formatMoney(((calculateITBI(valorTransacao) * 100) + (valorUfm * 2 * 100)).toFixed(0).padStart(3, '0'))}</strong>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Observações Adicionais (sairá no documento)</label>
                                    <textarea
                                        value={observacoes}
                                        onChange={e => setObservacoes(e.target.value)}
                                        maxLength={500}
                                        rows={3}
                                        placeholder="Caso deseje, adicione aqui observações que devem constar no boleto ou na guia."
                                        className="w-full border-gray-300 rounded-lg p-3 border focus:ring-blue-500 outline-none"
                                    />
                                    <div className="text-xs text-right text-gray-500">{observacoes.length}/500 caracteres</div>
                                </div>

                                <div className="flex justify-end pt-6 border-t">
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md">
                                        Visualizar e Gerar Solicitação
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}