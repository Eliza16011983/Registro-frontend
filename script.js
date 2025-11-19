// URL completa hacia la API Gateway (se carga desde index.html)
const API_URL = window.BACKEND_URL + "/users";

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();

  const formulario = document.getElementById("formulario-usuario");
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    await agregarUsuario(); 
  });
});

async function cargarUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar usuarios");

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La respuesta no es JSON");
    }

    const data = await response.json();

    const tbody = document.getElementById("tabla-usuarios");
    if (!tbody) {
      console.warn("No se encontró el tbody con id 'tabla-usuarios'");
      return;
    }

    tbody.innerHTML = "";
    data.forEach(user => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>${user.telefono}</td>
      `;
      tbody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    alert("No se pudieron cargar los usuarios.");
  }
}

async function agregarUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !email || !telefono) {
    alert("Por favor completá todos los campos.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error("No se pudo guardar el usuario.");
    }

    alert("Usuario agregado correctamente.");
    document.getElementById("formulario-usuario").reset();
    await cargarUsuarios(); 

  } catch (error) {
    console.error("Error al agregar usuario:", error);
    alert("Hubo un problema al guardar el usuario.");
  }
}
