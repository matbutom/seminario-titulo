document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const userForm = document.getElementById("user-form");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("phase-1");

  // Verificar si ya se ingresaron datos anteriormente
  const datosGuardados = localStorage.getItem("datosCompletados");

  if (datosGuardados === "true") {
    // Omitir overlay y mostrar contenido principal
    if (overlay) overlay.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  } else {
    if (mainContent) mainContent.style.display = "none";
  }

  // Mostrar formulario al hacer click en "Comenzar"
  if (startBtn && introStep && userForm) {
    startBtn.addEventListener("click", () => {
      introStep.style.display = "none";
      userForm.style.display = "flex";
    });
  }

  // Al enviar formulario, ocultar overlay y mostrar test luego de enviar datos (sin recarga)
  if (userForm) {
    userForm.addEventListener("submit", () => {
      setTimeout(() => {
        localStorage.setItem("datosCompletados", "true");
        if (overlay) overlay.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
      }, 500);
    });
  }

  // Control de cambio de tipografía
  const phrase = document.getElementById("test-phrase");
  const nextFontBtn = document.getElementById("next-font-btn");

  const fonts = ["font-times", "font-alegreya", "font-impact", "font-ubuntu"];
  let currentFont = 0;

  if (nextFontBtn && phrase) {
    nextFontBtn.addEventListener("click", () => {
      const sliderValue = document.getElementById("ideology-slider")?.value;
      console.log("Respuesta para " + fonts[currentFont] + ": " + sliderValue);

      currentFont++;
      if (currentFont >= fonts.length) {
        nextFontBtn.disabled = true;
        phrase.textContent = "¡Gracias por completar esta sección!";
        phrase.className = "";
      } else {
        phrase.className = fonts[currentFont];
      }
    });
  }
});
