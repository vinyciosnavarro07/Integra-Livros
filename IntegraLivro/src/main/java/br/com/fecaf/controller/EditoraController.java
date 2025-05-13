package br.com.fecaf.controller;

import br.com.fecaf.model.Editora;
import br.com.fecaf.services.EditoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/editoras")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class EditoraController {

    @Autowired
    private EditoraService editoraService;

    @GetMapping
    public List<Editora> listarEditoras() {
        return editoraService.listarEditoras();
    }

    @PostMapping
    public ResponseEntity<Editora> cadastrarEditora(@RequestBody Editora editora) {
        return ResponseEntity.status(HttpStatus.CREATED).body(editoraService.cadastrarEditora(editora));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEditora(@PathVariable int id) {
        editoraService.deletarEditora(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Editora> atualizarEditora(@PathVariable int id, @RequestBody Editora editora) {
        editora.setId(id);
        return ResponseEntity.ok(editoraService.atualizarEditora(editora));
    }
}
