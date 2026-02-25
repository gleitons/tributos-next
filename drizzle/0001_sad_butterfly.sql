CREATE TABLE `informacoes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`empresa` text,
	`cnpj` text,
	`inscricao_estadual` text,
	`inscricao_municipal` text,
	`cpf` text,
	`fantasia` text,
	`telefone` text,
	`data_nascimento` text,
	`email` text,
	`endereco` text,
	`numero` text,
	`bairro` text,
	`cep` text,
	`cidade` text,
	`estado` text,
	`data_abertura` text,
	`senha_siare` text,
	`senha_gov` text,
	`senha_nota_fiscal` text,
	`codigo_simples` text,
	`titulo` text,
	`situacao` text,
	`mei` text,
	`outras_informacoes` text,
	`atividade_principal` text,
	`atividade_secundaria` text,
	`regularize` text,
	`criado_em` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `itbi` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`protocolo` text,
	`data_transacao` text DEFAULT CURRENT_TIMESTAMP,
	`adquirente_id` integer,
	`transmitente_id` integer,
	`imovel_id` integer,
	`natureza` text,
	`qualidade_imovel` text,
	`condicao_imovel` text,
	`situacao_transmitente` text,
	`valor_transacao` real,
	`valor_venal` real,
	`valor_itbi` real,
	`observacoes` text,
	FOREIGN KEY (`adquirente_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transmitente_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`imovel_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `itbi_rural` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`protocolo` text,
	`usuario` text,
	`solicitante` text,
	`valor_ufm` real,
	`ano` integer,
	`adquirente` text,
	`transmitente` text,
	`area_terreno` text,
	`descricao_imovel` text,
	`natureza` text,
	`tipo_imovel` text,
	`qualidade_imovel` text,
	`condicao_imovel` text,
	`situacao_transmitente` text,
	`valor_transacao` real,
	`valor_itbi` real,
	`taxa_expediente` real DEFAULT 0,
	`observacoes` text,
	`data_criacao` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `itbi_urbano` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`protocolo` text,
	`usuario` text,
	`solicitante` text,
	`valor_ufm` real,
	`ano` integer,
	`adquirente` text,
	`transmitente` text,
	`area_terreno` text,
	`descricao_imovel` text,
	`natureza` text,
	`tipo_imovel` text DEFAULT 'URBANO',
	`qualidade_imovel` text,
	`condicao_imovel` text,
	`situacao_transmitente` text,
	`valor_transacao` real,
	`valor_itbi` real,
	`taxa_expediente` real DEFAULT 0,
	`observacoes` text,
	`data_criacao` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`nome` text NOT NULL,
	`cpf_cnpj` text NOT NULL,
	`rg` text,
	`telefone` text,
	`email` text,
	`endereco` text,
	`numero` text,
	`bairro` text,
	`cidade` text,
	`estado` text,
	`cep` text,
	`criado_em` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`descricao` text,
	`endereco` text,
	`numero` text,
	`bairro` text,
	`cidade` text,
	`estado` text,
	`cep` text,
	`matricula` text,
	`livro` text,
	`folha` text,
	`area_total` real,
	`area_aptidao_boa` real DEFAULT 0,
	`area_aptidao_regular` real DEFAULT 0,
	`area_aptidao_restrita` real DEFAULT 0,
	`area_pastagem_plantada` real DEFAULT 0,
	`area_pastagem_natural` real DEFAULT 0,
	`area_reserva` real DEFAULT 0,
	`area_lote` real,
	`area_construcao` real,
	`inscricao_municipal` text,
	`criado_em` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "email" TO "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `is_admin` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `endereco_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `logradouro_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `numero_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `complemento_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `bairro_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `cidade_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `estado_proprietario` text;--> statement-breakpoint
ALTER TABLE `rural_valuations` ADD `cep_proprietario` text;--> statement-breakpoint
ALTER TABLE `urban_valuations` ADD `numero_setor` text NOT NULL;