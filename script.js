document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const userForm = document.getElementById("user-form");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("phase-1");

  const phrase = document.getElementById("test-phrase");
  const nextFontBtn = document.getElementById("next-font-btn");

  const fonts = [
  "font-times",
  "font-alegreya",
  "font-impact",
  "font-ubuntu",
  "font-kapakana",
  "font-spacemono",
  "font-rowdies"
];
  let currentFont = 0;

  // Comprobar si datos básicos ya completados
  const datosGuardados = localStorage.getItem("datosCompletados");

  if (datosGuardados === "true") {
    if (overlay) overlay.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  } else {
    if (mainContent) mainContent.style.display = "none";
  }

  // Mostrar formulario básico al hacer click en "Comenzar"
  if (startBtn && introStep && userForm) {
    startBtn.addEventListener("click", () => {
      introStep.style.display = "none";
      userForm.style.display = "flex";
    });
  }

  // Al enviar formulario básico, guardar datos y ocultar overlay
  if (userForm) {
    userForm.addEventListener("submit", () => {
      localStorage.setItem("edad", document.getElementById("edad").value);
      localStorage.setItem("ciudad", document.getElementById("ciudad").value);
      localStorage.setItem("comuna", document.getElementById("comuna").value);

      setTimeout(() => {
        localStorage.setItem("datosCompletados", "true");
        if (overlay) overlay.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
      }, 500);
    });
  }

  // Control del botón siguiente tipografía
  if (nextFontBtn && phrase) {
    nextFontBtn.addEventListener("click", () => {
      const sliderValue = document.getElementById("ideology-slider").value;
      const currentFontName = fonts[currentFont];

      const edad = localStorage.getItem("edad") || "";
      const ciudad = localStorage.getItem("ciudad") || "";
      const comuna = localStorage.getItem("comuna") || "";

      // Rellenar formulario oculto
      document.getElementById("tipografia-edad").value = edad;
      document.getElementById("tipografia-ciudad").value = ciudad;
      document.getElementById("tipografia-comuna").value = comuna;
      document.getElementById("tipografia-tipografia").value = currentFontName;
      document.getElementById("tipografia-valor").value = sliderValue;

      // Enviar formulario oculto (no recarga la página)
      document.getElementById("tipografia-form").submit();

      // Avanzar a siguiente tipografía
      currentFont++;
      if (currentFont >= fonts.length) {
        nextFontBtn.disabled = true;
        phrase.textContent = "¡Gracias por completar esta sección!";
        phrase.className = "";
      } else {
        phrase.className = fonts[currentFont];
        document.getElementById("ideology-slider").value = 2;
      }
    });
  }
});
