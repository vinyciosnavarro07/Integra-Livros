package br.com.fecaf.services;

import br.com.fecaf.model.Autor;
import br.com.fecaf.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> listarAutores() {
        return autorRepository.findAll();
    }

    public Autor cadastrarAutor(Autor autor) {
        return autorRepository.save(autor);
    }

    public void deletarAutor(int id) {
        autorRepository.deleteById(id);
    }

    public Autor atualizarAutor(Autor autor) {
        return autorRepository.save(autor);
    }
}
