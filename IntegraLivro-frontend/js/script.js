const cardContainer = document.getElementById('cardContainer');

// Função de feedback
function showFeedback(message, type = 'success') {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.style.backgroundColor = type === 'error' ? '#dc3545' : '#28a745';
    feedback.classList.remove('hidden');
    feedback.classList.add('show');

    setTimeout(() => {
        feedback.classList.remove('show');
        feedback.classList.add('hidden');
    }, 3000);
}

// Carrega livros
async function loadBooks() {
    try {
        const response = await fetch('http://localhost:8080/api/livros');
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        showFeedback('Erro ao carregar livros.', 'error');
    }
}

// Renderiza cards
function renderBooks(books) {
    cardContainer.innerHTML = '';
    books.forEach((book) => {
        const card = document.createElement('div');
        card.className = 'card';
        const coverImage = book.capa ? `<img src="${book.capa}" alt="Capa do livro" class="book-cover" />` : '';
        card.innerHTML = `
            ${coverImage}
            <h3>${book.titulo}</h3>
            <p>Autor: ${book.autor?.nome || 'Não informado'}</p>
            <p>Editora: ${book.editora?.nome || 'Não informado'}</p>
            <p>Categoria: ${book.categoria?.nome || 'Não informado'}</p>
            <p>Ano: ${book.anoPublicacao || 'Não informado'}</p>
            <p>Status: ${book.status || 'Não informado'}</p>
            <p>Usuário: ${book.usuario?.nome || 'Não atribuído'} (ID: ${book.usuario?.id || 'Não atribuído'})</p>
        `;

        // Botão de excluir
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteBook(book.id);
        card.appendChild(deleteBtn);

        // Botão de editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => editBook(book);
        card.appendChild(editBtn);

        cardContainer.appendChild(card);
    });
}

// Função para editar um livro
function editBook(book) {
    window.location.href = '#cadastroLivroTitulo';
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.classList.add('open');
    }
    
    // Preenche os campos do formulário de edição com os dados do livro
    document.getElementById('tituloInput').value = book.titulo;
    document.getElementById('tituloInput').dataset.id = book.id; // Armazena o id do livro para usar na requisição

    document.getElementById('autorInput').value = book.autor?.id || '';
    document.getElementById('editoraInput').value = book.editora?.id || '';
    document.getElementById('categoriaInput').value = book.categoria?.id || '';
    document.getElementById('usuarioInput').value = book.usuario?.id || '';
    document.getElementById('anoInput').value = book.anoPublicacao || '';
    document.getElementById('statusInput').value = book.status || '';
    document.getElementById('isbnInput').value = book.isbn || '';
    document.getElementById('capaInput').value = book.capa || '';

    // Mostra o formulário de edição
    
}


// Função para salvar as alterações no livro
async function saveBook() {
    const id = document.getElementById('tituloInput').dataset.id; // id do livro sendo editado
    const livroAtualizado = {
    id: id,  // O ID correto do livro a ser editado
    titulo: document.getElementById('tituloInput').value,
    autor: { id: document.getElementById('autorInput').value },
    editora: { id: document.getElementById('editoraInput').value },
    categoria: { id: document.getElementById('categoriaInput').value },
    usuario: document.getElementById('usuarioInput').value ? { id: document.getElementById('usuarioInput').value } : null,  // Se estiver vazio, envia null
    anoPublicacao: document.getElementById('anoInput').value,
    status: document.getElementById('statusInput').value,
    isbn: document.getElementById('isbnInput').value,
    capa: document.getElementById('capaInput').value
};



    try {
        const response = await fetch(`http://localhost:8080/api/livros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livroAtualizado)
        });

        if (response.ok) {
            loadBooks();
            showFeedback('📚 Livro atualizado com sucesso!');
        } else {
            showFeedback('Erro ao atualizar livro.', 'error');
        }
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        showFeedback('Erro ao atualizar livro.', 'error');
    }
}

// Adiciona livro
// Adiciona livro com validação de campos obrigatórios
async function addBook() {
    const titulo = document.getElementById('tituloInput').value.trim();
    const autorId = document.getElementById('autorInput').value;
    const editoraId = document.getElementById('editoraInput').value;
    const categoriaId = document.getElementById('categoriaInput').value;
    const usuarioId = document.getElementById('usuarioInput').value;
    const ano = document.getElementById('anoInput').value.trim();
    const status = document.getElementById('statusInput').value.trim();
    const isbn = document.getElementById('isbnInput').value.trim();
    const capa = document.getElementById('capaInput').value.trim();

    // Verificação de campos obrigatórios
    if (!titulo || !autorId || !editoraId || !categoriaId || !ano || !status || !isbn || !capa) {
        showFeedback('Preencha todos os campos obrigatórios.', 'error');
        return;
    }

    const novoLivro = {
        titulo,
        autor: { id: autorId },
        editora: { id: editoraId },
        categoria: { id: categoriaId },
        usuario: usuarioId ? { id: usuarioId } : null,
        anoPublicacao: ano,
        status,
        isbn,
        capa
    };

    try {
        const response = await fetch('http://localhost:8080/api/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoLivro)
        });

        if (response.ok) {
            loadBooks();
            clearForm();
            showFeedback('📚 Livro cadastrado com sucesso!');
        } else {
            showFeedback('Erro ao cadastrar livro.', 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
        showFeedback('Erro ao cadastrar livro.', 'error');
    }
}


// Exclui livro
async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/livros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadBooks();
            showFeedback('📕 Livro excluído com sucesso!');
        } else {
            showFeedback('Erro ao excluir livro.', 'error');
        }
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        showFeedback('Erro ao excluir livro.', 'error');
    }
}

// Limpa formulário
function clearForm() {
    document.getElementById('tituloInput').value = '';
    document.getElementById('autorInput').value = '';
    document.getElementById('editoraInput').value = '';
    document.getElementById('categoriaInput').value = '';
    document.getElementById('usuarioInput').value = '';
    document.getElementById('anoInput').value = '';
    document.getElementById('statusInput').value = '';
    document.getElementById('isbnInput').value = '';
    document.getElementById('capaInput').value = '';
}

// Carrega selects
async function loadSelects() {
    const endpoints = [
        { id: 'autorInput', url: 'http://localhost:8080/api/autores' },
        { id: 'editoraInput', url: 'http://localhost:8080/api/editoras' },
        { id: 'categoriaInput', url: 'http://localhost:8080/api/categorias' },
        { id: 'usuarioInput', url: 'http://localhost:8080/api/usuarios' }
    ];

    for (const endpoint of endpoints) {
        const select = document.getElementById(endpoint.id);
        if (select) {
            try {
                const response = await fetch(endpoint.url);
                const data = await response.json();
                select.innerHTML = '<option value="">Selecione</option>';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nome;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error(`Erro ao carregar ${endpoint.id}:`, error);
            }
        }
    }
}

// Cadastro e exclusão de autores
async function addAutor() {
    const nome = document.getElementById('autorNomeInput').value;
    if (!nome.trim()) return showFeedback('Informe o nome do autor.', 'error');

    try {
        const response = await fetch('http://localhost:8080/api/autores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        if (response.ok) {
            showFeedback('✍️ Autor cadastrado com sucesso!');
            document.getElementById('autorNomeInput').value = '';
            loadSelects();
            loadAutores();
        } else {
            showFeedback('Erro ao cadastrar autor.', 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar autor:', error);
        showFeedback('Erro ao cadastrar autor.', 'error');
    }
}

async function deleteAutor(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/autores/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('🗑️ Autor excluído com sucesso!');
            loadSelects();
            loadAutores();
        } else {
            showFeedback('Erro ao excluir autor.', 'error');
        }
    } catch (error) {
        console.error('Erro ao excluir autor:', error);
        showFeedback('Erro ao excluir autor.', 'error');
    }
}

function renderAutores(autores) {
    const container = document.getElementById('autorList');
    container.innerHTML = '<h3>Autores</h3>';
    autores.forEach(autor => {
        const div = document.createElement('div');
        div.innerHTML = `${autor.nome} <button onclick="deleteAutor(${autor.id})">Excluir</button>`;
        container.appendChild(div);
    });
}

async function loadAutores() {
    try {
        const response = await fetch('http://localhost:8080/api/autores');
        const data = await response.json();
        renderAutores(data);
    } catch (error) {
        console.error('Erro ao carregar autores:', error);
    }
}

// Cadastro e exclusão de editoras
async function addEditora() {
    const nome = document.getElementById('editoraNomeInput').value;
    if (!nome.trim()) return showFeedback('Informe o nome da editora.', 'error');

    try {
        const response = await fetch('http://localhost:8080/api/editoras', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        if (response.ok) {
            showFeedback('🏢 Editora cadastrada com sucesso!');
            document.getElementById('editoraNomeInput').value = '';
            loadSelects();
            loadEditoras();
        } else {
            showFeedback('Erro ao cadastrar editora.', 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar editora:', error);
        showFeedback('Erro ao cadastrar editora.', 'error');
    }
}

async function deleteEditora(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/editoras/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('🏢 Editora excluída com sucesso!');
            loadSelects();
            loadEditoras();
        } else {
            showFeedback('Erro ao excluir editora.', 'error');
        }
    } catch (error) {
        console.error('Erro ao excluir editora:', error);
        showFeedback('Erro ao excluir editora.', 'error');
    }
}

function renderEditoras(editoras) {
    const container = document.getElementById('editoraList');
    container.innerHTML = '<h3>Editoras</h3>';
    editoras.forEach(editora => {
        const div = document.createElement('div');
        div.innerHTML = `${editora.nome} <button onclick="deleteEditora(${editora.id})">Excluir</button>`;
        container.appendChild(div);
    });
}

async function loadEditoras() {
    try {
        const response = await fetch('http://localhost:8080/api/editoras');
        const data = await response.json();
        renderEditoras(data);
    } catch (error) {
        console.error('Erro ao carregar editoras:', error);
    }
}

// Cadastro e exclusão de categorias
async function addCategoria() {
    const nome = document.getElementById('categoriaNomeInput').value;
    if (!nome.trim()) return showFeedback('Informe o nome da categoria.', 'error');

    try {
        const response = await fetch('http://localhost:8080/api/categorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        if (response.ok) {
            showFeedback('📂 Categoria cadastrada com sucesso!');
            document.getElementById('categoriaNomeInput').value = '';
            loadSelects();
            loadCategorias();
        } else {
            showFeedback('Erro ao cadastrar categoria.', 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar categoria:', error);
        showFeedback('Erro ao cadastrar categoria.', 'error');
    }
}

async function deleteCategoria(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/categorias/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('📂 Categoria excluída com sucesso!');
            loadSelects();
            loadCategorias();
        } else {
            showFeedback('Erro ao excluir categoria.', 'error');
        }
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        showFeedback('Erro ao excluir categoria.', 'error');
    }
}

function renderCategorias(categorias) {
    const container = document.getElementById('categoriaList');
    container.innerHTML = '<h3>Categorias</h3>';
    categorias.forEach(categoria => {
        const div = document.createElement('div');
        div.innerHTML = `${categoria.nome} <button onclick="deleteCategoria(${categoria.id})">Excluir</button>`;
        container.appendChild(div);
    });
}

async function loadCategorias() {
    try {
        const response = await fetch('http://localhost:8080/api/categorias');
        const data = await response.json();
        renderCategorias(data);
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

async function addUsuario() {
    const nome = document.getElementById('usuarioNomeInput').value;
    const cpfRg = document.getElementById('cpfRgInput').value;
    const endereco = document.getElementById('enderecoInput').value;
    const telefone = document.getElementById('telInput').value;

    if (!nome.trim() || !cpfRg.trim() || !endereco.trim() || !telefone.trim()) {
        return showFeedback('Preencha todos os campos.', 'error');
    }

    const novoUsuario = {
        nome,
        cpfRg,
        endereco,
        telefone
    };

    try {
        const response = await fetch('http://localhost:8080/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoUsuario)
        });

        if (response.ok) {
            showFeedback('✅ Usuário cadastrado com sucesso!');
            document.getElementById('usuarioNomeInput').value = '';
            document.getElementById('cpfRgInput').value = '';
            document.getElementById('enderecoInput').value = '';
            document.getElementById('telInput').value = '';
            loadUsuarios(); // se você tiver uma função para atualizar a lista
        } else {
            showFeedback('Erro ao cadastrar usuário.', 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        showFeedback('Erro ao cadastrar usuário.', 'error');
    }
}



// Cadastro e exclusão de usuários
async function deleteUsuario(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('🗑️ Usuário excluído com sucesso!');
            loadSelects();
            loadUsuarios();
        } else {
            showFeedback('Erro ao excluir usuário.', 'error');
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        showFeedback('Erro ao excluir usuário.', 'error');
    }
}

// Função para renderizar a lista de usuários
function renderUsuarios(usuarios) {
    const container = document.getElementById('usuarioList');
    container.innerHTML = '<h3>Usuários</h3>';
    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>CPF/RG:</strong> ${usuario.cpfRg}</p>
            <p><strong>Endereço:</strong> ${usuario.endereco}</p>
            <p><strong>Telefone:</strong> ${usuario.telefone}</p>
            <button onclick="deleteUsuario(${usuario.id})">Excluir</button>
        `;
        container.appendChild(div);
    });
}

async function loadUsuarios() {
    try {
        const response = await fetch('http://localhost:8080/api/usuarios');
        const data = await response.json();
        renderUsuarios(data);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

document.getElementById('toggleThemeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

document.addEventListener("DOMContentLoaded", function () {
    const headers = document.querySelectorAll(".form-container h2");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const container = header.parentElement;
            container.classList.toggle("open");
        });
    });
});



// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    loadSelects();
    loadAutores();
    loadEditoras();
    loadCategorias();
    loadUsuarios();
});
