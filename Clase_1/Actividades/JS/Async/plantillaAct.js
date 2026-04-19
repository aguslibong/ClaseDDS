function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Usuario encontrado");
    }, 4000);
  });
}

// hacer primer afuncion sin Async 



// hacer funcion con Async