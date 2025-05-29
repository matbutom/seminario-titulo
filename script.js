document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const userForm = document.getElementById("user-form");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("main-content");

  // Mostrar formulario cuando se hace click en "Comenzar"
  startBtn.addEventListener("click", function () {
    introStep.style.display = "none";
    userForm.style.display = "flex";
  });

  // Al enviar el formulario
  userForm.addEventListener("submit", function (e) {
    // No e.preventDefault(), dejamos que el formulario se envíe normalmente al iframe oculto

    // Opcional: aquí puedes poner un mensaje "Enviando..."

    // Esperamos un poco y luego ocultamos overlay y mostramos el test
    setTimeout(() => {
      overlay.style.display = "none";
      mainContent.style.display = "block";
    }, 500);
  });
});
