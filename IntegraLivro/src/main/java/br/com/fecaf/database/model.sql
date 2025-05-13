-- Criação do banco de dados
DROP DATABASE IF EXISTS integra_livro;
CREATE DATABASE integra_livro;
USE integra_livro;

-- Tabela: autores
CREATE TABLE autores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela: editoras
CREATE TABLE editoras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela: categorias
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

-- Tabela: livros
CREATE TABLE livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor_id INT,
    editora_id INT,
    isbn VARCHAR(20),
    ano_publicacao INT,
    categoria_id INT,
    status VARCHAR(20) DEFAULT 'disponível',
    data_cadastro DATE,
    capa VARCHAR(255),
    FOREIGN KEY (autor_id) REFERENCES autores(id),
    FOREIGN KEY (editora_id) REFERENCES editoras(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela: usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf_rg VARCHAR(20) UNIQUE NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20)
);

-- Tabela: emprestimos
CREATE TABLE emprestimos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    livro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status VARCHAR(20) DEFAULT 'emprestado',
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserção de autores
INSERT INTO autores (nome) VALUES
('Machado de Assis'),
('Clarice Lispector'),
('George Orwell');

-- Inserção de editoras
INSERT INTO editoras (nome) VALUES
('Companhia das Letras'),
('Editora Record'),
('Penguin Books');

-- Inserção de categorias
INSERT INTO categorias (nome) VALUES
('Romance'),
('Ficção Científica'),
('Ensaios');

-- Inserção de usuários
INSERT INTO usuarios (nome, cpf_rg, endereco, telefone) VALUES
('João Silva', '12345678900', 'Rua das Flores, 123', '11999999999'),
('Maria Oliveira', '98765432100', 'Av. Central, 456', '11888888888');

-- Inserção de livros
INSERT INTO livros (titulo, autor_id, editora_id, isbn, ano_publicacao, categoria_id, status, data_cadastro) VALUES
('Dom Casmurro', 1, 1, '9781234567890', 1899, 1, 'disponível', CURDATE()),
('A Hora da Estrela', 2, 2, '9789876543210', 1977, 1, 'emprestado', CURDATE()),
('1984', 3, 3, '9780451524935', 1949, 2, 'disponível', CURDATE());

-- Inserção de empréstimos (um livro já emprestado)
INSERT INTO emprestimos (livro_id, usuario_id, data_emprestimo, data_devolucao, status) VALUES
(2, 1, CURDATE(), NULL, 'emprestado');

select * from emprestimos;
select * from usuarios;
select * from autores;
select * from categorias;
select * from livros;