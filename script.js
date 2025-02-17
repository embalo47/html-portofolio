document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();

    document.getElementById("form-produto").addEventListener("submit", function (event) {
        event.preventDefault();
        adicionarProduto();
    });
});

function carregarProdutos() {
    fetch("api_produtos.php?acao=listar")
        .then(response => response.json())
        .then(produtos => {
            const lista = document.getElementById("lista-produtos");
            lista.innerHTML = "";
            produtos.forEach(produto => {
                lista.innerHTML += `
                    <tr>
                        <td>${produto.id_produto}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.preco}€</td>
                        <td>${produto.stock}</td>
                        <td><button onclick="eliminarProduto(${produto.id_produto})">Eliminar</button></td>
                    </tr>`;
            });
        });
}

function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const stock = document.getElementById("stock").value;

    fetch("api_produtos.php?acao=adicionar", {
        method: "POST",
        body: JSON.stringify({ nome, descricao, preco, stock }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(() => {
        alert("Produto adicionado com sucesso!");
        carregarProdutos();
        document.getElementById("form-produto").reset();
    });
}

function eliminarProduto(id) {
    fetch(`api_produtos.php?acao=eliminar&id=${id}`)
    .then(response => response.json())
    .then(() => {
        alert("Produto eliminado com sucesso!");
        carregarProdutos();
    });
}
