document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
});

function carregarProdutos() {
    fetch("../api/api_produtos.php?acao=listar")
        .then(response => response.json())
        .then(produtos => {
            let tabela = document.getElementById("lista-produtos");
            tabela.innerHTML = "";

            produtos.forEach(produto => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${produto.id_produto}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao || 'Sem descrição'}</td>
                    <td>€ ${produto.preco}</td>
                    <td>${produto.stock}</td>
                    <td>
                        ${produto.imagem ? `<img src="../uploads/${produto.imagem}" width="50" alt="${produto.nome}">` : 'Sem Imagem'}
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm editar-btn" 
                            data-id="${produto.id_produto}" 
                            data-nome="${produto.nome}" 
                            data-descricao="${produto.descricao}" 
                            data-preco="${produto.preco}" 
                            data-stock="${produto.stock}">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-danger btn-sm eliminar-btn" 
                            data-id="${produto.id_produto}">🗑️ Eliminar</button>
                    </td>
                `;
                tabela.appendChild(row);
            });

            // 🔹 Adicionar eventos para edição e exclusão
            document.querySelectorAll(".editar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    preencherFormularioEdicao(this.dataset);
                });
            });

            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", function () {
                    eliminarProduto(this.dataset.id);
                });
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

// 🔹 Preencher formulário para edição
function preencherFormularioEdicao(produto) {
    document.getElementById("id_produto").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("stock").value = produto.stock;

    // 🔹 Mudar texto do botão para "Atualizar Produto"
    document.getElementById("btn-submit").textContent = "Atualizar Produto";
}

// 🔹 Evento do formulário para adicionar ou atualizar
document.getElementById("form-produto").addEventListener("submit", function (event) {
    event.preventDefault();

    let id_produto = document.getElementById("id_produto").value;
    let nome = document.getElementById("nome").value;
    let descricao = document.getElementById("descricao").value;
    let preco = document.getElementById("preco").value;
    let stock = document.getElementById("stock").value;
    let imagem = document.getElementById("imagem").files[0];

    let formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    formData.append("stock", stock);
    if (imagem) formData.append("imagem", imagem);

    if (id_produto) {
        // 🔹 Atualizar Produto
        formData.append("id_produto", id_produto);
        fetch("../api/api_produtos.php?acao=atualizar", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem || data.erro);
            carregarProdutos();
            document.getElementById("form-produto").reset();
            document.getElementById("btn-submit").textContent = "Adicionar Produto";
        })
        .catch(error => console.error("Erro ao atualizar produto:", error));
    } else {
        // 🔹 Adicionar Produto
        fetch("../api/api_produtos.php?acao=adicionar", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem || data.erro);
            carregarProdutos();
            document.getElementById("form-produto").reset();
        })
        .catch(error => console.error("Erro ao adicionar produto:", error));
    }
});

// 🔹 Função para eliminar um produto
function eliminarProduto(id) {
    if (confirm("Tem certeza que deseja eliminar este produto?")) {
        fetch(`../api/api_produtos.php?acao=eliminar&id=${id}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem || "Erro ao eliminar produto!");
            carregarProdutos();
        })
        .catch(error => console.error("Erro ao eliminar produto:", error));
    }
}



