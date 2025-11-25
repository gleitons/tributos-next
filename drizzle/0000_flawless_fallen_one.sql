CREATE TABLE `rural_valuations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`protocolo` text,
	`ano_protocolo` integer,
	`ano_vtn` integer,
	`usuario` text,
	`solicitante` text,
	`nome_imovel` text NOT NULL,
	`denominacao` text,
	`endereco` text,
	`matricula` text,
	`folha` text,
	`livro` text,
	`registro_data` text,
	`genero_proprietario` text,
	`proprietario` text NOT NULL,
	`cpf_cnpj` text,
	`identidade` text,
	`conjuge` text,
	`cpf_conjuge` text,
	`identidade_conjuge` text,
	`area_total` real NOT NULL,
	`area_aptidao_boa` real DEFAULT 0,
	`area_aptidao_regular` real DEFAULT 0,
	`area_aptidao_restrita` real DEFAULT 0,
	`area_pastagem_plantada` real DEFAULT 0,
	`area_pastagem_natural` real DEFAULT 0,
	`area_reserva` real DEFAULT 0,
	`valor_terra_nua` real NOT NULL,
	`valor_construcoes` real DEFAULT 0,
	`valor_culturas` real DEFAULT 0,
	`valor_total` real NOT NULL,
	`data_avaliacao` text DEFAULT 'CURRENT_TIMESTAMP',
	`observacoes` text,
	FOREIGN KEY (`ano_vtn`) REFERENCES `vtn_years`(`ano`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ufm` (
	`ano` integer PRIMARY KEY NOT NULL,
	`valor` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `urban_valuations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`protocolo` text,
	`ano` integer,
	`usuario_id` integer,
	`solicitante` text,
	`rua` text,
	`numero` text,
	`bairro` text,
	`tipo_acabamento` real,
	`setor` real,
	`quadra` text,
	`lote` text,
	`area_lote` real NOT NULL,
	`area_construcao` real NOT NULL,
	`valor_venal` real NOT NULL,
	`data_avaliacao` text DEFAULT 'CURRENT_TIMESTAMP',
	`observacoes` text,
	FOREIGN KEY (`usuario_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`matricula` text NOT NULL,
	`nome` text NOT NULL,
	`sobrenome` text,
	`cargo` text,
	`setor` text,
	`data_admissao` text,
	`funcao` text,
	`email` text,
	`telefone` text,
	`status` text DEFAULT 'ativo',
	`criado_em` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `vtn_years` (
	`ano` integer PRIMARY KEY NOT NULL,
	`aptidao_boa` real NOT NULL,
	`aptidao_regular` real NOT NULL,
	`aptidao_restrita` real NOT NULL,
	`pastagem_plantada` real NOT NULL,
	`pastagem_natural` real NOT NULL,
	`reserva` real NOT NULL
);
