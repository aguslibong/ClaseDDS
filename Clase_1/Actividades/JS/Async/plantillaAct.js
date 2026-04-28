function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Usuario encontrado");
    }, 2000);
  });
}

// hacer primer afuncion sin Async 
<<<<<<< HEAD
=======
function funcionSinAsync(){
      console.log(obtenerUsuario())
      
}

funcionSinAsync()

// hacer funcion con Async
async function funcionConAsync(){
      console.log(await obtenerUsuario())
      
}

funcionConAsync()
>>>>>>> 8c09974911993e93b9024c9e0f9c522568abc6f2
