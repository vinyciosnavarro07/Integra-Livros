package br.com.fecaf.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nome;
    private String cpfRg;  // Adicionando o campo CPF/RG
    private String endereco;  // Adicionando o campo Endereço
    private String telefone;  // Adicionando o campo Telefone

    // Construtores
    public Usuario() {}

    public Usuario(String nome, String cpfRg, String endereco, String telefone) {
        this.nome = nome;
        this.cpfRg = cpfRg;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpfRg() {
        return cpfRg;
    }

    public void setCpfRg(String cpfRg) {
        this.cpfRg = cpfRg;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
