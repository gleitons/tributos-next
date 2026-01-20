import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from "drizzle-orm";

export const vtnYears = sqliteTable('vtn_years', {
    ano: integer('ano').primaryKey(),
    aptidaoBoa: real('aptidao_boa').notNull(),
    aptidaoRegular: real('aptidao_regular').notNull(),
    aptidaoRestrita: real('aptidao_restrita').notNull(),
    pastagemPlantada: real('pastagem_plantada').notNull(),
    pastagemNatural: real('pastagem_natural').notNull(),
    reserva: real('reserva').notNull(),
});

export const ruralValuations = sqliteTable('rural_valuations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // Dados Iniciais
    protocolo: text('protocolo'),
    anoProtocolo: integer('ano_protocolo'),
    anoVtn: integer('ano_vtn').references(() => vtnYears.ano),
    usuario: text('usuario'),
    solicitante: text('solicitante'),

    // Endereço do Imóvel
    nomeImovel: text('nome_imovel').notNull(),
    denominacao: text('denominacao'),
    endereco: text('endereco'),
    matricula: text('matricula'),
    folha: text('folha'),
    livro: text('livro'),
    registroData: text('registro_data'), // ISO format YYYY-MM-DD

    // Informações do Proprietário
    generoProprietario: text('genero_proprietario'),
    proprietario: text('proprietario').notNull(),
    cpfCnpj: text('cpf_cnpj'),
    identidade: text('identidade'),
    enderecoProprietario: text('endereco_proprietario'),
    logradouroProprietario: text('logradouro_proprietario'),
    numeroProprietario: text('numero_proprietario'),
    complementoProprietario: text('complemento_proprietario'),
    bairroProprietario: text('bairro_proprietario'),
    cidadeProprietario: text('cidade_proprietario'),
    estadoProprietario: text('estado_proprietario'),
    cepProprietario: text('cep_proprietario'),
    conjuge: text('conjuge'),
    cpfConjuge: text('cpf_conjuge'),
    identidadeConjuge: text('identidade_conjuge'),

    // Tamanho da Área (Hectares)
    areaTotal: real('area_total').notNull(),

    // Distribuição da Área (Hectares ou %) - Vamos salvar em Hectares para precisão
    areaAptidaoBoa: real('area_aptidao_boa').default(0),
    areaAptidaoRegular: real('area_aptidao_regular').default(0),
    areaAptidaoRestrita: real('area_aptidao_restrita').default(0),
    areaPastagemPlantada: real('area_pastagem_plantada').default(0),
    areaPastagemNatural: real('area_pastagem_natural').default(0),
    areaReserva: real('area_reserva').default(0),

    // Valores Venais e Construções
    valorTerraNua: real('valor_terra_nua').notNull(),
    valorConstrucoes: real('valor_construcoes').default(0),
    valorCulturas: real('valor_culturas').default(0),
    valorTotal: real('valor_total').notNull(),

    dataAvaliacao: text('data_avaliacao').default('CURRENT_TIMESTAMP'),
    observacoes: text('observacoes'),
});

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    matricula: text('matricula').notNull(),
    nome: text('nome').notNull(),
    sobrenome: text('sobrenome'),
    cargo: text('cargo'),
    setor: text('setor'),
    dataAdmissao: text('data_admissao'),
    funcao: text('funcao'),
    email: text('email'),
    telefone: text('telefone'),
    status: text('status').default('ativo'),
    criadoEm: text('criado_em').default(sql`CURRENT_TIMESTAMP`),
});

export const urbanValuations = sqliteTable('urban_valuations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // Dados Iniciais
    protocolo: text('protocolo'),
    ano: integer('ano'),
    usuarioId: integer('usuario_id').references(() => users.id),
    solicitante: text('solicitante'),

    // Endereço do Imóvel
    rua: text('rua'),
    numero: text('numero'),
    bairro: text('bairro'),

    // Imóvel Urbano
    tipoAcabamento: real('tipo_acabamento'), // Valor do acabamento
    setor: real('setor'), // Valor do setor
    numeroSetor: text('numero_setor').notNull(),
    quadra: text('quadra'),
    lote: text('lote'),

    // Tamanho do Imóvel
    areaLote: real('area_lote').notNull(),
    areaConstrucao: real('area_construcao').notNull(),

    // Valores
    valorVenal: real('valor_venal').notNull(),

    dataAvaliacao: text('data_avaliacao').default('CURRENT_TIMESTAMP'),
    observacoes: text('observacoes'),
});

export const ufm = sqliteTable('ufm', {
    ano: integer('ano').primaryKey(),
    valor: real('valor').notNull(),
});

export const people = sqliteTable('people', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tipo: text('tipo').notNull(), // 'FISICA' or 'JURIDICA'
    nome: text('nome').notNull(),
    cpfCnpj: text('cpf_cnpj').notNull(),
    rg: text('rg'),
    telefone: text('telefone'),
    email: text('email'),
    endereco: text('endereco'),
    numero: text('numero'),
    bairro: text('bairro'),
    cidade: text('cidade'),
    estado: text('estado'),
    cep: text('cep'),
    criadoEm: text('criado_em').default(sql`CURRENT_TIMESTAMP`),
});

export const properties = sqliteTable('properties', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tipo: text('tipo').notNull(), // 'RURAL' or 'URBANO'
    descricao: text('descricao'),

    // Endereço
    endereco: text('endereco'),
    numero: text('numero'),
    bairro: text('bairro'),
    cidade: text('cidade'),
    estado: text('estado'),
    cep: text('cep'),

    // Dados Cartoriais
    matricula: text('matricula'),
    livro: text('livro'),
    folha: text('folha'),

    // Dados Rurais (Campos específicos solicitados)
    areaTotal: real('area_total'),
    areaAptidaoBoa: real('area_aptidao_boa').default(0),
    areaAptidaoRegular: real('area_aptidao_regular').default(0),
    areaAptidaoRestrita: real('area_aptidao_restrita').default(0),
    areaPastagemPlantada: real('area_pastagem_plantada').default(0),
    areaPastagemNatural: real('area_pastagem_natural').default(0),
    areaReserva: real('area_reserva').default(0),

    // Dados Urbanos
    areaLote: real('area_lote'),
    areaConstrucao: real('area_construcao'),
    inscricaoMunicipal: text('inscricao_municipal'),

    criadoEm: text('criado_em').default(sql`CURRENT_TIMESTAMP`),
});

export const itbi = sqliteTable('itbi', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    protocolo: text('protocolo'),
    dataTransacao: text('data_transacao').default(sql`CURRENT_TIMESTAMP`),

    adquirenteId: integer('adquirente_id').references(() => people.id),
    transmitenteId: integer('transmitente_id').references(() => people.id),
    imovelId: integer('imovel_id').references(() => properties.id),

    natureza: text('natureza'), // COMPRA E VENDA, ETC

    qualidadeImovel: text('qualidade_imovel'),
    condicaoImovel: text('condicao_imovel'),
    situacaoTransmitente: text('situacao_transmitente'),

    valorTransacao: real('valor_transacao'),
    valorVenal: real('valor_venal'),
    valorItbi: real('valor_itbi'),

    observacoes: text('observacoes'),
});
