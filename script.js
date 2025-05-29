document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const userForm = document.getElementById("user-form");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("main-content");

  // Mostrar formulario al hacer click en "Comenzar"
  startBtn.addEventListener("click", () => {
    introStep.style.display = "none";
    userForm.style.display = "flex";
  });

  // Al enviar formulario, ocultar overlay y mostrar test luego de enviar datos (sin recarga)
  userForm.addEventListener("submit", () => {
    // Le damos un pequeño delay para que el formulario se envíe vía iframe
    setTimeout(() => {
      overlay.style.display = "none";
      mainContent.style.display = "block";
    }, 500);
  });
});
