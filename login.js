document.querySelectorAll(".js-entrar").forEach(btn => {
  btn.addEventListener("click", irParaLogin);
});
function irParaLogin() {
  window.location.href = "login.html";
}