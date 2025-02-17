<?php
require_once 'api/config_email.php';

$email = "embalou67@gmail.com"; // Digita um email válido aqui
$assunto = "🔑 Teste de Email";
$mensagem = "<h2>Este é um teste de envio de email!</h2>";

$resultado = enviarEmail($email, $assunto, $mensagem);

if ($resultado === true) {
    echo "✅ Email enviado com sucesso!";
} else {
    echo "❌ Erro ao enviar email: " . $resultado;
}
?>
