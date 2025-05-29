document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const userForm = document.getElementById("user-form");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("main-content");

  // Al hacer clic en "Comenzar", mostrar el formulario
  startBtn.addEventListener("click", function () {
    introStep.style.display = "none";
    userForm.style.display = "flex";
  });

  // Al enviar el formulario, enviamos datos a Google Sheets, luego mostramos test
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const edad = document.getElementById("edad").value;
    const ciudad = document.getElementById("ciudad").value;
    const comuna = document.getElementById("comuna").value;

    fetch("https://script.google.com/macros/s/AKfycbx5ePerxHWu7X8XgYJtidoB9IWBXzJ00DeR8sWWw0EeSR_avrtNo7gc8B0_S-siBZG6_Q/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ edad, ciudad, comuna })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);
      overlay.style.display = "none";
      mainContent.style.display = "block";
    })
    .catch(error => {
      console.error("Error enviando datos:", error);
      alert("Hubo un error enviando tus datos. Por favor intenta de nuevo.");
    });
  });
});
