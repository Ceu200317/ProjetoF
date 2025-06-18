let tarefas = [];

window.onload = function() {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(texto => criarItemNaLista(texto));
    }
};

function salvarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const campo = document.getElementById("campoTarefa");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Por favor, digite uma tarefa.");
        return;
    }

    criarItemNaLista(texto);
    tarefas.push(texto);
    salvarLocalStorage();

    campo.value = "";
}

function criarItemNaLista(texto) {
    const lista = document.getElementById("lista");

    const item = document.createElement("li");

    
    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = texto;
    textoTarefa.className = "texto-tarefa";

    
    const btnConcluir = document.createElement("span");
    btnConcluir.textContent = " concluir";
    btnConcluir.className = "btn-concluir";

    btnConcluir.addEventListener("click", function (e) {
        e.stopPropagation();
        textoTarefa.classList.toggle("feito");
    });

    
    const btnRemover = document.createElement("span");
    btnRemover.textContent = " remover";
    btnRemover.className = "btn-remover";

    btnRemover.addEventListener("click", function (e) {
        e.stopPropagation();
        lista.removeChild(item);

        tarefas = tarefas.filter(t => t !== texto);
        salvarLocalStorage();
    });

    
    item.appendChild(textoTarefa);
    item.appendChild(btnConcluir);
    item.appendChild(btnRemover);
    lista.appendChild(item);
}
