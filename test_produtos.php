<?php
require_once 'produtos.php';

// Criar um novo produto
$novoProdutoId = criarProduto("Teclado Mecânico", "Teclado RGB para gaming", 49.99, 100);

if (is_numeric($novoProdutoId)) {
    echo "Novo produto criado com ID: " . $novoProdutoId . "<br>";
} else {
    echo "Erro ao criar produto!<br>";
}

// Listar produtos
$produtos = listarProdutos();
echo "Lista de Produtos:<br>";
foreach ($produtos as $produto) {
    echo "ID: " . $produto['id_produto'] . " - Nome: " . $produto['nome'] . " - Preço: " . $produto['preco'] . "€<br>";
}

// Atualizar um produto
if ($novoProdutoId) {
    atualizarProduto($novoProdutoId, "Teclado Gamer RGB", "Teclado profissional com iluminação LED", 55.99, 90);
    echo "Produto atualizado!<br>";
}

// Eliminar um produto (descomentar para testar)
// eliminarProduto($novoProdutoId);
// echo "Produto eliminado!<br>";
?>
