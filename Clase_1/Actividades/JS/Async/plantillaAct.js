function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Usuario encontrado");
    }, 2000);
  });
}

// hacer primer afuncion sin Async 
function funcionSinAsync(){
      console.log(obtenerUsuario())
      
}

funcionSinAsync()

// hacer funcion con Async
async function funcionConAsync(){
      console.log(await obtenerUsuario())
      
}

funcionConAsync()