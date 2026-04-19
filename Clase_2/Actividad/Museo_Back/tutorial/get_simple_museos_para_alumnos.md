# Paso a paso detallado: crear el endpoint GET más simple con Express, Controller, Service y Sequelize

## Objetivo

En esta guía vamos a construir **el endpoint más simple posible** de una API:

```http
GET /museos
```

La idea es que cuando alguien haga esa petición, el backend responda con **todos los museos** guardados en la base de datos.

Pero no solo vamos a escribir el código. También vamos a entender **todo el recorrido interno**:

1. El cliente hace una petición.
2. Express recibe esa petición.
3. El `controller` captura la ruta.
4. El `controller` llama al `service`.
5. El `service` usa el `model` de Sequelize.
6. Sequelize consulta la base de datos.
7. Los datos vuelven al `service`.
8. El `service` devuelve el resultado al `controller`.
9. El `controller` arma la respuesta en JSON.
10. Postman muestra el resultado.

---

# 1. Primero entendamos la estructura del proyecto

En tu plantilla aparecen estas partes:

- `app.js`
- `db.js`
- `modelMUSEO.js`
- `serviceMUSEOS.js`
- `controllerMUSEO.js`

Cada archivo cumple una responsabilidad distinta.

## `db.js`

Se encarga de crear la conexión con la base de datos.

## `modelMUSEO.js`

Define cómo es la tabla o entidad `Museo` dentro de Sequelize.

## `serviceMUSEOS.js`

Contiene la lógica de acceso a datos. Es decir, acá se consulta el modelo.

## `controllerMUSEO.js`

Define las rutas del endpoint y decide qué hacer cuando llega una petición HTTP.

## `app.js`

Levanta Express, registra el controller, inicializa la base de datos y enciende el servidor.

---

# 2. ¿Qué hace Sequelize en todo esto?

Sequelize es un **ORM**.

Eso significa que nos permite trabajar con la base de datos usando **objetos y métodos de JavaScript**, en lugar de escribir SQL manualmente todo el tiempo.

Por ejemplo, en vez de escribir algo como:

```sql
SELECT * FROM Museos;
```

con Sequelize podemos escribir:

```js
Museo.findAll()
```

Y Sequelize se encarga de transformar eso en una consulta real a la base de datos.

---

# 3. Flujo completo del endpoint GET /museos

Antes de escribir el código, veamos mentalmente qué va a pasar.

## Paso 1

Postman hace esta petición:

```http
GET http://localhost:3021/museos
```

## Paso 2

Express recibe la petición y busca si existe una ruta `GET /museos`.

## Paso 3

Esa ruta está definida en el `controller`.

## Paso 4

El `controller` no busca los datos directamente. En lugar de eso, llama al `service`.

## Paso 5

El `service` usa el modelo `Museo`.

## Paso 6

El modelo `Museo` usa Sequelize para consultar la base de datos.

## Paso 7

La base devuelve los registros.

## Paso 8

El `service` le devuelve esos datos al `controller`.

## Paso 9

El `controller` responde con `res.json(...)`.

## Paso 10

Postman muestra el array de museos.

---
# Diagrama de Sequiencia
mirar la imagen DIGRAMA DE SEUWNCIA GET

# 4. Paso 1: configurar la base de datos en `db.js`

Archivo:

```js
import Sequelize from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

export default sequelize;
```

## ¿Qué significa esto?

### `import Sequelize from "sequelize";`

Acá importamos la librería Sequelize para poder usarla.

### `new Sequelize("sqlite::memory:")`

Le estamos diciendo a Sequelize que use **SQLite en memoria**.

Eso significa:

- la base existe mientras el programa está corriendo,
- no se guarda en un archivo físico,
- cuando apagás el servidor, los datos se pierden.

Para practicar en clase está muy bien, porque permite probar rápido sin instalar un motor pesado.

### `export default sequelize;`

Exportamos la conexión para poder usarla en otros archivos, por ejemplo en el modelo.

---

# 5. Paso 2: definir el modelo `Museo` en `modelMUSEO.js`

Ahora necesitamos decirle a Sequelize cómo es un museo.

Archivo completo sugerido:

```js
import sequelize from "../../config/data/db.js";
import DataTypes from "sequelize";

const Museo = sequelize.define(
  "Museo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exposiciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioEntrada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Museo;
```

---

## ¿Qué hace este archivo?

### `sequelize.define(...)`

Con esto estamos creando un modelo llamado `Museo`.

Ese modelo representa una tabla.

### Primer parámetro: `"Museo"`

Es el nombre del modelo.

### Segundo parámetro: objeto con atributos

Acá definimos las columnas.

Por ejemplo:

```js
nombre: {
  type: DataTypes.STRING,
  allowNull: false,
}
```

Eso significa que `nombre`:

- será texto,
- no puede venir vacío.

### `id`

Agregamos una clave primaria para que cada museo tenga un identificador único.

### `{ timestamps: false }`

Le decimos a Sequelize que **no agregue automáticamente**:

- `createdAt`
- `updatedAt`

Si no ponemos esto, Sequelize suele intentar crearlos.

---

# 6. Paso 3: crear la lógica de negocio simple en `serviceMUSEOS.js`

Ahora vamos a escribir el service.

Archivo completo sugerido:

```js
import MUSEO from "../model/modelMUSEO.js";

async function obtenerTodos() {
  const museos = await MUSEO.findAll();
  return museos;
}

export default {
  obtenerTodos,
};
```

---

## ¿Qué hace este archivo?

El `service` es una capa intermedia.

No responde HTTP.
No usa `req` ni `res`.
No define rutas.

Su trabajo es concentrar la lógica que trabaja con datos.

---

## Línea por línea

### `import MUSEO from "../model/modelMUSEO.js";`

Importamos el modelo.

Eso nos permite usar métodos como:

- `findAll()`
- `findByPk()`
- `create()`
- `update()`
- `destroy()`

### `async function obtenerTodos()`

La función es `async` porque consultar la base de datos lleva tiempo.

No es instantáneo. Por eso usamos asincronía.

### `const museos = await MUSEO.findAll();`

Acá ocurre lo más importante.

`findAll()` le pide a Sequelize que traiga **todos los registros** de la tabla `Museo`.

`await` significa: “esperá a que la base devuelva los datos antes de seguir”.

### `return museos;`

El `service` devuelve el array de museos al `controller`.

### `export default { obtenerTodos }`

Exportamos el método para que el `controller` pueda usarlo.

---

# 7. Paso 4: crear la ruta GET en `controllerMUSEO.js`

Ahora sí vamos a capturar la petición HTTP.

Archivo completo sugerido:

```js
import { Router } from "express";
import service from "../service/serviceMUSEOS.js";

const router = Router();

router.get("/museos", async (req, res) => {
  try {
    const museos = await service.obtenerTodos();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los museos",
      error: error.message,
    });
  }
});

export default router;
```

---

## ¿Qué hace este archivo?

El `controller` trabaja con HTTP.

Acá sí aparecen:

- rutas,
- `req`,
- `res`,
- códigos de estado,
- respuestas JSON.

---

## Línea por línea

### `import { Router } from "express";`

Traemos el enrutador de Express.

Eso nos permite separar rutas en archivos distintos.

### `import service from "../service/serviceMUSEOS.js";`

Importamos el service para reutilizar la lógica.

### `const router = Router();`

Creamos un router.

Ese router va a guardar las rutas relacionadas con museos.

### `router.get("/museos", async (req, res) => { ... })`

Acá definimos el endpoint.

Significa:

- si llega una petición `GET`
- a la ruta `/museos`
- ejecutá esta función.

### `const museos = await service.obtenerTodos();`

El controller no va directo al modelo.

En vez de eso, le pide al service que haga el trabajo.

Eso hace que el código quede más ordenado.

### `res.status(200).json(museos);`

Respondemos al cliente con:

- código 200, que significa “todo salió bien”,
- un JSON con el array de museos.

### `try / catch`

Lo usamos para capturar errores.

Si algo falla en la consulta, devolvemos un error 500.

---

# 8. Paso 5: conectar el controller en `app.js`

Ahora Express tiene que enterarse de que existe ese router.

Archivo orientativo:

```js
import Express from "express";
import Cors from "cors";
import sequelize from "./config/data/db.js";
import MUSEO from "./app/model/modelMUSEO.js";
import museoController from "./app/controller/controllerMUSEO.js";

const app = Express();
app.use(Express.json());
app.use(Cors());

app.use(museoController);

async function inicializarBaseDeDatos() {
  await sequelize.sync({ force: true });

  await MUSEO.bulkCreate([
    {
      nombre: "Museo del Prado",
      ubicacion: "Madrid, España",
      exposiciones: "Clásicos del Renacimiento",
      horarios: "09:00 - 18:00",
      precioEntrada: "15€",
    },
    {
      nombre: "Louvre",
      ubicacion: "París, Francia",
      exposiciones: "Arte y Cultura Egipcia",
      horarios: "09:00 - 20:00",
      precioEntrada: "17€",
    },
  ]);
}

inicializarBaseDeDatos().then(() => {
  app.listen(3021, () => console.log("Inicio backend"));
});

export default app;
```

---

## ¿Qué hace este archivo?

Este archivo es el punto de arranque del backend.

---

## Línea por línea importante

### `const app = Express();`

Crea la aplicación Express.

### `app.use(Express.json());`

Permite que Express entienda JSON en el body de las peticiones.

Para este `GET` no es obligatorio, pero ya deja preparado el proyecto para `POST` y `PUT`.

### `app.use(Cors());`

Permite peticiones desde otros orígenes, por ejemplo un frontend o Postman sin problemas de acceso cruzado.

### `app.use(museoController);`

Acá estamos registrando el router.

Esto significa que las rutas definidas en `controllerMUSEO.js` pasan a formar parte de la app.

Si no ponés esta línea, el endpoint nunca existirá aunque el controller esté bien escrito.

---

# 9. ¿Qué hace `sequelize.sync({ force: true })`?

Esta línea es clave:

```js
await sequelize.sync({ force: true });
```

## Significado

Le dice a Sequelize:

- mirá los modelos definidos,
- creá las tablas necesarias,
- y como `force: true`, borrá y recreá todo desde cero.

Para práctica sirve mucho, porque cada vez que corrés el proyecto arrancás limpio.

Pero atención:

- en producción esto sería peligroso,
- porque borra la base y la vuelve a crear.

---

# 10. ¿Qué hace `bulkCreate`?

```js
await MUSEO.bulkCreate([...]);
```

Sirve para cargar varios registros iniciales de una sola vez.

O sea, cuando se inicia la app, ya quedan museos cargados para poder probar el `GET`.

Si no hicieras esto, el endpoint podría funcionar perfectamente, pero te devolvería un array vacío:

```json
[]
```

---

# 11. Recorrido real de la petición, explicado como cadena

Ahora sí, veámoslo como un flujo completo.

## El usuario hace esto en Postman

```http
GET http://localhost:3021/museos
```

## Entonces pasa esto

### 1.
Postman manda una petición HTTP al servidor.

### 2.
Express la recibe porque el servidor está escuchando en el puerto `3021`.

### 3.
Express revisa las rutas registradas mediante `app.use(museoController)`.

### 4.
Dentro del router encuentra esta coincidencia:

```js
router.get("/museos", ...)
```

### 5.
Ejecuta la función del controller.

### 6.
El controller llama al service:

```js
await service.obtenerTodos()
```

### 7.
El service usa el modelo:

```js
await MUSEO.findAll()
```

### 8.
Sequelize traduce eso a una consulta sobre SQLite.

### 9.
SQLite devuelve los registros.

### 10.
Sequelize transforma esos datos en objetos JavaScript.

### 11.
El service devuelve esos objetos al controller.

### 12.
El controller arma la respuesta:

```js
res.status(200).json(museos)
```

### 13.
Postman recibe el JSON y lo muestra en pantalla.

---

# 12. Resultado esperado en Postman

Si todo está bien, deberías ver algo parecido a esto:

```json
[
  {
    "id": 1,
    "nombre": "Museo del Prado",
    "ubicacion": "Madrid, España",
    "exposiciones": "Clásicos del Renacimiento",
    "horarios": "09:00 - 18:00",
    "precioEntrada": "15€"
  },
  {
    "id": 2,
    "nombre": "Louvre",
    "ubicacion": "París, Francia",
    "exposiciones": "Arte y Cultura Egipcia",
    "horarios": "09:00 - 20:00",
    "precioEntrada": "17€"
  }
]
```

---

# 13. Cómo probarlo en Postman paso a paso

## 1.
Abrí la terminal en la carpeta del proyecto.

## 2.
Instalá dependencias si todavía no lo hiciste:

```bash
npm install
```

## 3.
Iniciá el proyecto.

Como en tu `package.json` no hay script `start`, podés correrlo así:

```bash
node app.js
```

## 4.
Esperá ver en consola:

```bash
Inicio backend
```

## 5.
Abrí Postman.

## 6.
Elegí método `GET`.

## 7.
Escribí esta URL:

```http
http://localhost:3021/museos
```

## 8.
Presioná **Send**.

## 9.
Deberías recibir código `200 OK` y el JSON con los museos.

---

# 14. Errores típicos y cómo detectarlos

## Error 1: `Cannot GET /museos`

### Causa posible

No registraste el controller en `app.js`.

### Revisar

```js
app.use(museoController);
```

---

## Error 2: la app arranca pero devuelve array vacío

### Causa posible

No cargaste datos con `bulkCreate`.

---

## Error 3: Sequelize tira error de columnas

### Causa posible

El modelo no tiene definidos los campos que después usás en `bulkCreate`.

---

## Error 4: `service.obtenerTodos is not a function`

### Causa posible

No exportaste bien el método en el service.

Debe quedar así:

```js
export default {
  obtenerTodos,
};
```

---

## Error 5: no levanta el servidor

### Causa posible

Estás ejecutando mal el proyecto o faltan dependencias.

Probá:

```bash
npm install
node app.js
```

---

# 15. ¿Por qué separar en controller y service si podría hacerse todo junto?

Muy buena pregunta para alumnos.

Sí, se podría hacer todo dentro del controller.

Por ejemplo, esto funcionaría:

```js
router.get("/museos", async (req, res) => {
  const museos = await MUSEO.findAll();
  res.json(museos);
});
```

Pero no conviene a medida que el proyecto crece.

## Separar capas ayuda a:

- ordenar responsabilidades,
- reutilizar lógica,
- facilitar mantenimiento,
- hacer el código más claro,
- testear mejor.

## Regla simple

- `controller`: recibe peticiones y responde.
- `service`: resuelve la lógica.
- `model`: representa la tabla.
- `sequelize`: conecta y consulta la base.

---

# 16. Resumen final del flujo

## `db.js`
Crea la conexión con SQLite mediante Sequelize.

## `modelMUSEO.js`
Define cómo es un museo dentro de la base.

## `serviceMUSEOS.js`
Pide todos los museos usando `findAll()`.

## `controllerMUSEO.js`
Expone la ruta `GET /museos` y responde con JSON.

## `app.js`
Levanta Express, registra el router, crea tablas, carga datos y prende el servidor.

---

# 17. Código mínimo final funcionando

## `db.js`

```js
import Sequelize from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

export default sequelize;
```

## `modelMUSEO.js`

```js
import sequelize from "../../config/data/db.js";
import DataTypes from "sequelize";

const Museo = sequelize.define(
  "Museo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exposiciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioEntrada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Museo;
```

## `serviceMUSEOS.js`

```js
import MUSEO from "../model/modelMUSEO.js";

async function obtenerTodos() {
  return await MUSEO.findAll();
}

export default {
  obtenerTodos,
};
```

## `controllerMUSEO.js`

```js
import { Router } from "express";
import service from "../service/serviceMUSEOS.js";

const router = Router();

router.get("/museos", async (req, res) => {
  try {
    const museos = await service.obtenerTodos();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

export default router;
```

## `app.js`

```js
import Express from "express";
import Cors from "cors";
import sequelize from "./config/data/db.js";
import MUSEO from "./app/model/modelMUSEO.js";
import museoController from "./app/controller/controllerMUSEO.js";

const app = Express();
app.use(Express.json());
app.use(Cors());

app.use(museoController);

async function inicializarBaseDeDatos() {
  await sequelize.sync({ force: true });

  await MUSEO.bulkCreate([
    {
      nombre: "Museo del Prado",
      ubicacion: "Madrid, España",
      exposiciones: "Clásicos del Renacimiento",
      horarios: "09:00 - 18:00",
      precioEntrada: "15€",
    },
    {
      nombre: "Louvre",
      ubicacion: "París, Francia",
      exposiciones: "Arte y Cultura Egipcia",
      horarios: "09:00 - 20:00",
      precioEntrada: "17€",
    },
  ]);
}

inicializarBaseDeDatos().then(() => {
  app.listen(3021, () => console.log("Inicio backend"));
});
```

---

# 18. Idea pedagógica para explicarlo en clase

Una forma fácil de contarlo es así:

- **Postman golpea la puerta**.
- **Express abre**.
- **El controller atiende**.
- **El controller le pide ayuda al service**.
- **El service va a buscar los datos al modelo**.
- **El modelo habla con Sequelize**.
- **Sequelize consulta la base**.
- **Los datos vuelven por el mismo camino**.
- **El controller responde al cliente**.

Esa imagen mental ayuda mucho a que entiendan el flujo real de una API.

