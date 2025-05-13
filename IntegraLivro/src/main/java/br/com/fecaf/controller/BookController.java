package br.com.fecaf.controller;

import br.com.fecaf.model.Book;
import br.com.fecaf.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // Endpoint para listar todos os livros
    @GetMapping
    public List<Book> listarLivros() {
        return bookService.listarLivros();
    }

    // Endpoint para cadastrar um novo livro
    @PostMapping
    public ResponseEntity<Book> cadastrarLivro(@RequestBody Book book) {
        Book novoLivro = bookService.cadastrarLivro(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoLivro);
    }

    // Endpoint para deletar um livro pelo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLivro(@PathVariable int id) {
        bookService.deletarLivro(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // Endpoint para atualizar um livro pelo ID
    @PutMapping("/{id}")
    public ResponseEntity<Book> atualizarLivro(@PathVariable int id, @RequestBody Book book) {
        try {
            book.setId(id);  // Define o ID do livro que deve ser atualizado
            Book livroAtualizado = bookService.atualizarLivro(book);
            return ResponseEntity.status(HttpStatus.OK).body(livroAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Retorna 404 se o livro não for encontrado
        }
    }

}