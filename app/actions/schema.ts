import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// 1. Cadastro de Proprietários (Contribuintes)
export const proprietarios = sqliteTable('proprietarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  documento: text('documento').unique(), // CPF ou CNPJ
  email: text('email'),
  telefone: text('telefone'),
  enderecoCobranca: text('endereco_cobranca'),
  cidade: text('cidade').default('Lagoa dos Patos'),
  estado: text('estado').default('MG'),
});

// 2. Cadastro de Imóveis
export const imoveis = sqliteTable('imoveis', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  inscricaoMunicipal: text('inscricao_municipal').unique().notNull(),
  matricula: text('matricula'), // Matrícula no Cartório de Registro de Imóveis
  registrado: integer('registrado', { mode: 'boolean' }).default(false), // Sim ou Não
  
  // Localização
  logradouro: text('logradouro').notNull(),
  numero: text('numero'),
  bairro: text('bairro').notNull(),
  cep: text('cep').default('39360-000'),

  // Classificação
  tipo: text('tipo').$type<'residencial' | 'comercial' | 'industrial' | 'religioso' | 'publico' | 'rural'>().notNull(),
  numeroSetor: text('numero_setor').notNull(),
  
  // Medidas e Confrontações
  medidaFrente: real('medida_frente'),
  medidaFundo: real('medida_fundo'),
  medidaEsquerda: real('medida_esquerda'),
  medidaDireita: real('medida_direita'),
  areaTotal: real('area_total').notNull(), // m² ou Hectares
  
  // Vínculo com Proprietário
  proprietarioId: integer('proprietario_id').references(() => proprietarios.id),

  // Extras úteis para Tributos
  valorVenal: real('valor_venal'),
  dataCadastro: text('data_cadastro').default('CURRENT_TIMESTAMP'),
});

// 3. Definição das Relações (Drizzle Relations)
export const proprietariosRelations = relations(proprietarios, ({ many }) => ({
  imoveis: many(imoveis),
}));

export const imoveisRelations = relations(imoveis, ({ one }) => ({
  proprietario: one(proprietarios, {
    fields: [imoveis.proprietarioId],
    references: [proprietarios.id],
  }),
}));