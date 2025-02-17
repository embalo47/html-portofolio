<?php
require_once 'clientes.php';

// Criar um cliente
$novoClienteId = criarCliente("Maria Santos", "maria@email.com", "923456789", "Rua Nova, 456");

if (is_numeric($novoClienteId)) {
    echo "Novo cliente criado com ID: " . $novoClienteId . "<br>";
} else {
    echo $novoClienteId . "<br>"; // Exibe a mensagem de erro, como "O email já está registado!"
}

// Listar clientes
$clientes = listarClientes();
echo "Lista de Clientes:<br>";
foreach ($clientes as $cliente) {
    echo $cliente['id_cliente'] . " - " . $cliente['nome'] . "<br>";
}



// Atualizar o cliente com ID 1
$resultado = atualizarCliente(1, "João Silva Atualizado", "joao@email.com", "912345678", "Rua Nova, 123");

if ($resultado === true) {
    echo "Cliente atualizado com sucesso!";
} else {
    echo $resultado; // Exibe a mensagem de erro se houver
}
?>


?>

