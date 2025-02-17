<?php
require_once 'conec.php';
/**
 * Criar um novo cliente
 */


function criarCliente($nome, $email, $telefone, $morada) {
    global $pdo;

    // Verificar se o email já existe
    $verificar_sql = "SELECT COUNT(*) FROM Cliente WHERE email = :email";
    $stmt_verificar = $pdo->prepare($verificar_sql);
    $stmt_verificar->execute(['email' => $email]);
    $existe = $stmt_verificar->fetchColumn();

    if ($existe > 0) {
        return "Erro: O email já está registado!";
    }

    // Inserir o novo cliente
    $sql = "INSERT INTO Cliente (nome, email, telefone, morada) VALUES (:nome, :email, :telefone, :morada)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['nome' => $nome, 'email' => $email, 'telefone' => $telefone, 'morada' => $morada]);

    return $pdo->lastInsertId();
}

// Outras funções CRUD (listarClientes, atualizarCliente, eliminarCliente) vêm aqui...


/**
 * Obter todos os clientes
 */
function listarClientes() {
    global $pdo;
    $sql = "SELECT * FROM Cliente ORDER BY id_cliente DESC";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

/**
 * Atualizar um cliente
 */
function atualizarCliente($id, $nome, $email, $telefone, $morada) {
    global $pdo;

    // Verificar se o email já existe, mas ignorar o próprio cliente
    $sql_verificar = "SELECT COUNT(*) FROM Cliente WHERE email = :email AND id_cliente != :id";
    $stmt_verificar = $pdo->prepare($sql_verificar);
    $stmt_verificar->execute(['email' => $email, 'id' => $id]);
    $existe = $stmt_verificar->fetchColumn();

    if ($existe > 0) {
        return "Erro: O email já está registado!";
    }

    // Atualizar os dados do cliente
    $sql = "UPDATE Cliente SET nome = :nome, email = :email, telefone = :telefone, morada = :morada WHERE id_cliente = :id";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute(['id' => $id, 'nome' => $nome, 'email' => $email, 'telefone' => $telefone, 'morada' => $morada]);
}


/**
 * Eliminar um cliente
 */
function eliminarCliente($id) {
    global $pdo;
    $sql = "DELETE FROM Cliente WHERE id_cliente = :id";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute(['id' => $id]);
}
?>
