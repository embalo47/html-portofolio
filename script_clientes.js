document.addEventListener("DOMContentLoaded", function () {
    carregarClientes();
});

// Função para carregar clientes e exibir na tabela
function carregarClientes() {
    fetch("../api/api_clientes.php?acao=listar")
        .then(response => response.json())
        .then(clientes => {
            let tabela = document.getElementById("lista-clientes");
            tabela.innerHTML = ""; // Limpa a tabela antes de carregar os clientes

            clientes.forEach(cliente => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cliente.id_cliente}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone || 'N/A'}</td>
                    <td>${cliente.morada || 'N/A'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar-btn" data-id="${cliente.id_cliente}" data-nome="${cliente.nome}" data-email="${cliente.email}" data-telefone="${cliente.telefone}" data-morada="${cliente.morada}">Editar</button>
                        <button class="btn btn-danger btn-sm eliminar-btn" data-id="${cliente.id_cliente}">Eliminar</button>
                    </td>
                `;
                tabela.appendChild(row);
            });

            // Adicionar eventos aos botões após carregar os clientes
            document.querySelectorAll(".editar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    editarCliente(this.dataset.id, this.dataset.nome, this.dataset.email, this.dataset.telefone, this.dataset.morada);
                });
            });

            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    eliminarCliente(this.dataset.id);
                });
            });
        })
        .catch(error => console.error("Erro ao carregar clientes:", error));
}

// Função para editar um cliente (preenche o formulário com os dados)
function editarCliente(id, nome, email, telefone, morada) {
    document.getElementById("id_cliente").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("email").value = email;
    document.getElementById("telefone").value = telefone;
    document.getElementById("morada").value = morada;
}

// Função para eliminar um cliente
function eliminarCliente(id) {
    if (confirm("Tem certeza que deseja eliminar este cliente?")) {
        fetch(`../api/api_clientes.php?acao=eliminar&id=${id}`, {
            method: "GET"
        })
        .then(response => {
            console.log("Resposta bruta da API:", response);
            return response.json();  // ✅ Garante conversão para JSON
        })
        .then(data => {
            console.log("Resposta da API após conversão:", data); // 🛠️ Verificar no Console
            if (data.mensagem) {
                alert(data.mensagem);  // ✅ Agora mostra "Cliente eliminado com sucesso"
            } else if (data.erro) {
                alert("Erro: " + data.erro);
            } else {
                alert("Erro: Resposta inesperada da API!");
            }
            carregarClientes(); // 🔄 Atualiza a lista após eliminar
        })
        .catch(error => {
            console.error("Erro ao eliminar cliente:", error);
            alert("Erro ao eliminar cliente!");
        });
    }
}


// Função para adicionar ou atualizar cliente
document.getElementById("form-cliente").addEventListener("submit", function (event) {
    event.preventDefault();

    let id_cliente = document.getElementById("id_cliente").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let morada = document.getElementById("morada").value;

    let url = `../api/api_clientes.php?acao=${id_cliente ? "atualizar&id=" + id_cliente : "adicionar"}`;

    console.log("Enviando para:", url);  // 🛠️ Depuração da URL
    console.log("Dados enviados:", JSON.stringify({ nome, email, telefone, morada }));  // 🛠️ Testa se os dados estão certos

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, morada })
    })
    .then(response => response.json())  // ✅ Agora sempre converte para JSON
    .then(data => {
        console.log("Resposta da API após conversão:", data); // 🛠️ Verificar resposta no Console
        if (data.mensagem) {
            alert(data.mensagem);  // ✅ Agora só mostra a mensagem se existir
        } else {
            alert("Erro: Resposta inesperada da API!");
        }
        document.getElementById("form-cliente").reset();
        document.getElementById("id_cliente").value = "";
        carregarClientes();  // 🔄 Atualiza a lista após editar cliente
    })
    .catch(error => {
        console.error("Erro ao adicionar/atualizar cliente:", error);
        alert("Erro ao atualizar cliente!");
    });
});


