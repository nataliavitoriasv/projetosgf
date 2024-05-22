-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/05/2024 às 22:41
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projetosgf`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargo`
--

CREATE TABLE `cargo` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `departamento_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cargo`
--

INSERT INTO `cargo` (`id`, `nome`, `salario`, `departamento_id`) VALUES
(1, 'Desenvolvedor de Software', 7000.00, 1),
(2, 'Analista de Infraestrutura de TI', 7500.00, 1),
(3, 'Administrador de Banco de Dados', 8000.00, 1),
(4, 'Analista de Marketing Digital', 5500.00, 2),
(5, 'Especialista em SEO (Otimização de Mecanismos de Busca)', 4100.00, 2),
(6, 'Designer Gráfico', 4500.00, 2),
(7, 'Analista de Recrutamento e Seleção', 3600.00, 3),
(8, 'Gerente de RH', 5000.00, 3),
(9, 'Assistente de RH', 3000.00, 3),
(10, 'Contador', 5000.00, 4),
(11, 'Analista Financeiro', 4200.00, 4),
(12, 'Assistente Contábil', 2500.00, 4),
(13, 'Gerente de Vendas', 4000.00, 5),
(14, 'Consultor de Vendas', 2000.00, 5),
(15, 'Assistente de Atendimento ao Cliente', 1500.00, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `departamento`
--

INSERT INTO `departamento` (`id`, `nome`) VALUES
(1, 'TI'),
(2, 'Marketing'),
(3, 'Recursos Humanos'),
(4, 'Financeiro e Contabilidade'),
(5, 'Vendas e Atendimento ao Cliente');

-- --------------------------------------------------------

--
-- Estrutura para tabela `folha_pagamento`
--

CREATE TABLE `folha_pagamento` (
  `funcionario_id` int(11) DEFAULT NULL,
  `cargo` varchar(255) NOT NULL,
  `departamento` int(11) DEFAULT NULL,
  `data_admissao` date DEFAULT NULL,
  `horas_trabalhadas` decimal(10,2) DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `data_pagamento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  `data_admissao` date DEFAULT NULL,
  `horas_trabalhadas` decimal(10,2) DEFAULT NULL,
  `valor_horas` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionario`
--

INSERT INTO `funcionario` (`id`, `nome`, `telefone`, `email`, `cargo`, `departamento`, `data_admissao`, `horas_trabalhadas`, `valor_horas`) VALUES
(58, 'Patrick Ramos ', '31 9854752648', 'patrickrt@gmail.com', 'Assistente de RH', 'Recursos Humanos', '2023-05-08', 250.00, 12.00),
(61, 'Eric Guimarães Costa', '31 987638457', 'ericcosta4@gmail.com', 'Analista de Marketing Digital', 'Marketing', '2023-07-08', 240.00, 23.00),
(63, 'Júlio César Oliveira', '31 935726453', 'julioco34@gmail.com', '3000.00 - Assistente de RH', 'Recursos Humanos', '2023-09-09', 250.00, 12.00),
(65, 'Giovanna Freitas Drummond', '31 9856364731', 'giodrummond2003@gmail.com', '7500.00 - Analista de Infraestrutura de TI', 'TI', '2024-02-06', 255.00, 29.00),
(66, 'Camila Guerra Siqueira', '31 995875264', 'siqueiracamila65@gmail.com', '8000.00 - Administrador de Banco de Dados', 'TI', '2024-05-04', 240.00, 33.00),
(69, 'Fernanda Ribeiro Costela', '31 982743245', 'fernandorib@gmail.com', '7000.00 - Desenvolvedor de Software', 'TI', '2023-07-06', 240.00, 29.00),
(71, 'Valéria Soares Cruz', '31983752643', 'valeriasoares78@gmail.com', '4500.00 - Designer Gráfico', 'TI', '2023-06-09', 250.00, 18.00),
(72, 'Gustavo Almeida Vieira', '31 937526153', 'gustavoalmeida54@gmail.com', '4000.00 - Gerente de Vendas', 'Vendas e Atendimento ao Cliente', '2023-07-22', 240.00, 17.00);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_departamento_id` (`departamento_id`);

--
-- Índices de tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `folha_pagamento`
--
ALTER TABLE `folha_pagamento`
  ADD KEY `funcionario_id` (`funcionario_id`);

--
-- Índices de tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `fk_departamento_id` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`id`);

--
-- Restrições para tabelas `folha_pagamento`
--
ALTER TABLE `folha_pagamento`
  ADD CONSTRAINT `folha_pagamento_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
