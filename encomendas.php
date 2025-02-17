<?php
require_once 'conec.php';

/**
 * Criar uma nova encomenda
 */
function criarEncomenda($id_cliente) {
    global $pdo;

    // Verifica se o cliente existe antes de criar a encomenda
    $sql = "SELECT id_cliente FROM Cliente WHERE id_cliente = :id_cliente";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id_cliente' => $id_cliente]);
    $cliente = $stmt->fetch();

    if (!$cliente) {
        return "Erro: O cliente não existe!";
    }

    // Criar encomenda
    $sql = "INSERT INTO Encomenda (id_cliente, data_encomenda, estado) VALUES (:id_cliente, NOW(), 'pendente')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id_cliente' => $id_cliente]);

    return $pdo->lastInsertId();
}


/**
 * Obter todas as encomendas
 */
function listarEncomendas() {
    global $pdo;
    $sql = "SELECT Encomenda.id_encomenda, Cliente.nome AS cliente, Encomenda.data_encomenda, Encomenda.estado 
            FROM Encomenda 
            INNER JOIN Cliente ON Encomenda.id_cliente = Cliente.id_cliente 
            ORDER BY Encomenda.id_encomenda DESC";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

/**
 * Atualizar o estado da encomenda
 */
function atualizarEncomenda($id_encomenda, $estado) {
    global $pdo;
    $sql = "UPDATE Encomenda SET estado = :estado WHERE id_encomenda = :id_encomenda";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute(['id_encomenda' => $id_encomenda, 'estado' => $estado]);
}

/**
 * Eliminar uma encomenda
 */
function eliminarEncomenda($id_encomenda) {
    global $pdo;
    $sql = "DELETE FROM Encomenda WHERE id_encomenda = :id_encomenda";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute(['id_encomenda' => $id_encomenda]);
}
?>
