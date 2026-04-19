function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Usuario encontrado");
      // reject("Error al buscar usuario");
    }, 4000);
  });
}


// Forma 1: usando async / await
async function mostrarUsuario() {
  try {
    const resultado = await obtenerUsuario();
    console.log("Con async/await:", resultado);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Forma 1: usando async / await
function mostrarUsuarioSinAsync() {
  try {
    const resultado = obtenerUsuario();
    console.log("Sin async/await:", resultado);
  } catch (error) {
    console.log("Error:", error);
  }
}


mostrarUsuario();

mostrarUsuarioSinAsync();