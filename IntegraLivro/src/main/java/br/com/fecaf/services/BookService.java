package br.com.fecaf.services;

import br.com.fecaf.model.Book;
import br.com.fecaf.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Método para listar todos os livros
    public List<Book> listarLivros() {
        return bookRepository.findAll();
    }

    // Método para cadastrar um novo livro
    public Book cadastrarLivro(Book book) {
        return bookRepository.save(book);
    }

    // Método para deletar um livro pelo ID
    public void deletarLivro(int id) {
        bookRepository.deleteById(id);
    }

    // Método para atualizar um livro existente
    public Book atualizarLivro(Book book) {
        if (!bookRepository.existsById(book.getId())) {
            throw new RuntimeException("Livro não encontrado com o ID " + book.getId());
        }
        return bookRepository.save(book); // Atualiza o livro existente
    }

}
