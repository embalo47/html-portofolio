<?php
require_once 'conec.php';

/**
 * Criar um novo produto
 */
function criarProduto($nome, $descricao, $preco, $stock) {
    global $pdo;
    $sql = "INSERT INTO Produto (nome, descricao, preco, stock) VALUES (:nome, :descricao, :preco, :stock)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'nome' => $nome, 
        'descricao' => $descricao, 
        'preco' => $preco, 
        'stock' => $stock
    ]);
    return $pdo->lastInsertId();
}

/**
 * Obter todos os produtos
 */
function listarProdutos() {
    global $pdo;
    $sql = "SELECT id_produto AS id, nome, descricao, preco, stock, imagem FROM Produto ORDER BY id_produto DESC";
    $stmt = $pdo->query($sql);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}


/**
 * Atualizar um produto
 */
function atualizarProduto($id_produto, $nome, $descricao, $preco, $stock) {
    global $pdo;
    $sql = "UPDATE Produto SET nome = :nome, descricao = :descricao, preco = :preco, stock = :stock WHERE id_produto = :id_produto";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([
        'id_produto' => $id_produto, 
        'nome' => $nome, 
        'descricao' => $descricao, 
        'preco' => $preco, 
        'stock' => $stock
    ]);
}

/**
 * Eliminar um produto
 */
function eliminarProduto($id_produto) {
    global $pdo;
    $sql = "DELETE FROM Produto WHERE id_produto = :id_produto";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute(['id_produto' => $id_produto]);
}
?>
