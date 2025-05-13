package br.com.fecaf.services;

import br.com.fecaf.model.Editora;
import br.com.fecaf.repository.EditoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EditoraService {

    @Autowired
    private EditoraRepository editoraRepository;

    public List<Editora> listarEditoras() {
        return editoraRepository.findAll();
    }

    public Editora cadastrarEditora(Editora editora) {
        return editoraRepository.save(editora);
    }

    public void deletarEditora(int id) {
        editoraRepository.deleteById(id);
    }

    public Editora atualizarEditora(Editora editora) {
        return editoraRepository.save(editora);
    }
}
