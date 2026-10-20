/* ---------- Abas (Entrar / Registrar-se) ---------- */
function mostrarAba(nome) {
  document.querySelectorAll(".tab").forEach(function (tab) {
    const ativa = tab.dataset.tab === nome;
    tab.setAttribute("aria-selected", ativa);
    document.getElementById("form-" + tab.dataset.tab).hidden = !ativa;
  });
}

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () { mostrarAba(tab.dataset.tab); });
});

/* ---------- Linguagens de programação e línguas faladas ---------- */
const linguagens = []; // { nome, nivel }
const idiomas = [];    // textos

function renderLista(ul, itens, rotulo) {
  ul.replaceChildren();
  itens.forEach(function (item, i) {
    const li = document.createElement("li");
    li.className = "chip";
    li.textContent = rotulo(item);

    const remover = document.createElement("button");
    remover.type = "button";
    remover.textContent = "×";
    remover.setAttribute("aria-label", "Remover " + rotulo(item));
    remover.addEventListener("click", function () {
      itens.splice(i, 1);
      renderLista(ul, itens, rotulo);
    });

    li.appendChild(remover);
    ul.appendChild(li);
  });
}

function renderLinguagens() {
  renderLista(document.getElementById("lang-lista"), linguagens, function (l) { return l.nome + " · " + l.nivel; });
}

function renderIdiomas() {
  renderLista(document.getElementById("idioma-lista"), idiomas, function (i) { return i; });
}

function adicionarLinguagem() {
  const campo = document.getElementById("lang-nome");
  const nome = campo.value.trim();
  if (!nome) return;
  linguagens.push({ nome: nome, nivel: document.getElementById("lang-nivel").value });
  campo.value = "";
  renderLinguagens();
}

function adicionarIdioma() {
  const campo = document.getElementById("idioma-nome");
  const nome = campo.value.trim();
  if (!nome) return;
  idiomas.push(nome);
  campo.value = "";
  renderIdiomas();
}

document.getElementById("lang-add").addEventListener("click", adicionarLinguagem);
document.getElementById("idioma-add").addEventListener("click", adicionarIdioma);

// Enter nesses campos adiciona o item em vez de enviar o formulário
[["lang-nome", adicionarLinguagem], ["idioma-nome", adicionarIdioma]].forEach(function (par) {
  document.getElementById(par[0]).addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); par[1](); }
  });
});

/* ---------- Envio dos formulários ---------- */
document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  // TODO: enviar para o back-end (login)
  console.log("Login:", dados);
});

document.getElementById("form-registro").addEventListener("submit", function (e) {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  dados.linguagens = linguagens;
  dados.idiomas = idiomas;
  // TODO: enviar para o back-end (registro)
  console.log("Registro:", dados);
});