document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const introStep = document.getElementById("intro-step");
  const overlay = document.getElementById("intro-overlay");
  const mainContent = document.getElementById("phase-1");

  const phrase = document.getElementById("test-phrase");
  const nextFontBtn = document.getElementById("next-font-btn");

  const fonts = ["font-times", "font-alegreya", "font-impact", "font-ubuntu"];
  let currentFont = 0;

  // Mostrar contenido principal si datos ya completados
  const datosGuardados = localStorage.getItem("datosCompletados");
  if (datosGuardados === "true") {
    if (overlay) overlay.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  } else {
    if (mainContent) mainContent.style.display = "none";
  }

  // Evento click para mostrar formulario básico
  if (startBtn && introStep) {
    startBtn.addEventListener("click", () => {
      introStep.style.display = "none";
      mostrarFormularioBasico();
    });
  }

  function mostrarFormularioBasico() {
    // Crear formulario básico dinámicamente para controlar el envío con fetch
    const form = document.createElement("form");
    form.id = "user-form";

    form.innerHTML = `
      <h2>Introduce tus datos</h2>
      <input type="number" id="edad" name="edad" placeholder="Edad" required />
      <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" required />
      <input type="text" id="comuna" name="comuna" placeholder="Comuna" required />
      <button type="submit" id="submit-form-btn">Continuar</button>
    `;

    introStep.appendChild(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        edad: form.edad.value,
        ciudad: form.ciudad.value,
        comuna: form.comuna.value,
      };

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxCjeegKbycaLixcozWkYyfKJdOF07jN1zRzJqnf6cliNLnXhHtPIR5N2aYExjOTjywnw/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.result === "success") {
          localStorage.setItem("edad", data.edad);
          localStorage.setItem("ciudad", data.ciudad);
          localStorage.setItem("comuna", data.comuna);
          localStorage.setItem("datosCompletados", "true");

          if (overlay) overlay.style.display = "none";
          if (mainContent) mainContent.style.display = "block";
        } else {
          alert("Error al enviar los datos: " + result.message);
        }
      } catch (error) {
        alert("Error al enviar los datos: " + error);
      }
    });
  }

  // Manejar el botón siguiente tipografía
  if (nextFontBtn && phrase) {
    nextFontBtn.addEventListener("click", async () => {
      const sliderValue = document.getElementById("ideology-slider").value;
      const currentFontName = fonts[currentFont];

      const data = {
        edad: localStorage.getItem("edad") || "",
        ciudad: localStorage.getItem("ciudad") || "",
        comuna: localStorage.getItem("comuna") || "",
        tipografia: currentFontName,
        valor: sliderValue,
      };

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxCjeegKbycaLixcozWkYyfKJdOF07jN1zRzJqnf6cliNLnXhHtPIR5N2aYExjOTjywnw/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.result === "success") {
          currentFont++;
          if (currentFont >= fonts.length) {
            nextFontBtn.disabled = true;
            phrase.textContent = "¡Gracias por completar esta sección!";
            phrase.className = "";
          } else {
            phrase.className = fonts[currentFont];
            document.getElementById("ideology-slider").value = 2;
          }
        } else {
          alert("Error al enviar los datos: " + result.message);
        }
      } catch (error) {
        alert("Error al enviar los datos: " + error);
      }
    });
  }
});
