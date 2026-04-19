Apartir de una función llamada obtenerUsuario que simula una consulta a una base de datos. La función  retornar una promesa que tarde 2 segundos en resolverse y devuelva el texto "Usuario encontrado". 

Luego, consumí esa función de dos maneras. 
Primero sin usar async y await ,creando una funcion que se llame mostrarUsuarioSinAsync mostrando en consola el resultado cuando la promesa se resuelva. 
Después hacelo nuevamente utilizando async y await, creando una función llamada mostrarUsuario que espere la respuesta e imprima el resultado por consola. 

En ambas utiliza try y catch el cual sirve para manejar errores sin que se corte la ejecucion ( osea sin que se te rompa el backend en un futuro)

Finalmente explicá con tus palabras qué diferencia notás entre ambas formas de trabajar.