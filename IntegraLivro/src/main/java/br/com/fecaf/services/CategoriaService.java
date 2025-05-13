package br.com.fecaf.services;

import br.com.fecaf.model.Categoria;
import br.com.fecaf.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria cadastrarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void deletarCategoria(int id) {
        categoriaRepository.deleteById(id);
    }

    public Categoria atualizarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
}
