# Paso a paso detallado para crear una API CRUD de Museos con Express, Sequelize y SQLite

## 1. ¿Qué plantilla tenemos?

Tu plantilla ya está armada con una estructura en capas muy buena para enseñar una API simple:

- `app.js` levanta Express, habilita JSON, CORS, registra el controlador y además inicializa la base con datos de prueba.
- `controllerMUSEO.js` ya crea un `Router` de Express e importa el service, pero todavía no tiene endpoints.
- `serviceMUSEOS.js` importa el modelo y `Op` de Sequelize, pero todavía no tiene la lógica.
- `modelMUSEO.js` define el modelo `Museo`, aunque todavía no tiene sus atributos.
- `db.js` usa SQLite en memoria, así que cada vez que reinicies el servidor la base vuelve a empezar desde cero.
- `package.json` ya tiene las dependencias necesarias (`express`, `sequelize`, `sqlite3`, `cors`) y además el proyecto está configurado como módulo con `"type": "module"`. 

## 2. ¿Qué vamos a construir?

Vamos a crear los 4 tipos de operaciones básicas sobre la entidad `Museo`:

- **Consulta general** → traer todos los museos.
- **Consulta individual** → traer un museo por id.
- **Alta** → crear un nuevo museo.
- **Modificación** → actualizar un museo existente.
- **Baja** → eliminar un museo.

En otras palabras, vamos a armar un CRUD completo.

---

# 3. Completar el modelo

## Archivo: `modelMUSEO.js`

Ahora mismo el modelo está vacío, aunque en `app.js` se están insertando museos con estos campos:

- `nombre`
- `ubicacion`
- `exposiciones`
- `horarios`
- `precioEntrada` 

Entonces el primer paso es definir esas columnas dentro del modelo.

### Código final sugerido

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

## ¿Qué hace este código?

Acá estamos diciendo cómo será la tabla `Museo` en la base de datos.

- `id` será la clave primaria.
- `autoIncrement: true` hace que el id se genere solo.
- Los demás campos representan los datos de cada museo.
- `allowNull: false` obliga a que esos campos vengan con valor.
- `timestamps: false` evita que Sequelize agregue automáticamente `createdAt` y `updatedAt`. fileciteturn0file1

---

# 4. Crear la lógica del service

## Archivo: `serviceMUSEOS.js`

El service será la capa que habla con la base de datos. El controlador no debería tener consultas SQL ni lógica de Sequelize: eso queda acá.

### Código final sugerido

```js
import MUSEO from "../model/modelMUSEO.js";
import { Op } from "sequelize";

async function getAll() {
  return await MUSEO.findAll();
}

async function getById(id) {
  return await MUSEO.findByPk(id);
}

async function create(data) {
  return await MUSEO.create(data);
}

async function update(id, data) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.update(data);
  return museo;
}

async function remove(id) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.destroy();
  return museo;
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
```

## ¿Qué hace cada función?

### `getAll()`
Trae todos los museos de la tabla.

### `getById(id)`
Busca un museo por su clave primaria.

### `create(data)`
Crea un registro nuevo usando los datos enviados por el cliente.

### `update(id, data)`
Primero busca el museo. Si no existe devuelve `null`. Si existe, actualiza sus campos.

### `remove(id)`
Busca el museo por id. Si existe, lo elimina físicamente de la base.

> Nota para explicar en clase: acá la baja es **física** porque usamos `destroy()`. Si después querés enseñar baja lógica, se puede agregar un campo como `activo` y en vez de borrar se marca `false`.

Aunque `Op` está importado en tu plantilla, en este CRUD básico todavía no hace falta usarlo. Queda útil si después querés enseñar filtros, por ejemplo búsquedas por nombre o ubicación. fileciteturn0file2

---

# 5. Crear cada endpoint en el controller

## Archivo: `controllerMUSEO.js`

Este archivo ya tiene un `Router()` creado y ya importa el service. Ahí es donde vamos a declarar las rutas. fileciteturn0file0

### Código final sugerido

```js
import { Router } from 'express';
import service from '../service/serviceMUSEOS.js';

const router = Router();

// GET todos los museos
router.get('/museos', async (req, res) => {
  try {
    const museos = await service.getAll();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los museos' });
  }
});

// GET museo por id
router.get('/museos/:id', async (req, res) => {
  try {
    const museo = await service.getById(req.params.id);

    if (!museo) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el museo' });
  }
});

// POST crear museo
router.post('/museos', async (req, res) => {
  try {
    const nuevoMuseo = await service.create(req.body);
    res.status(201).json(nuevoMuseo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el museo' });
  }
});

// PUT modificar museo
router.put('/museos/:id', async (req, res) => {
  try {
    const museoActualizado = await service.update(req.params.id, req.body);

    if (!museoActualizado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el museo' });
  }
});

// DELETE eliminar museo
router.delete('/museos/:id', async (req, res) => {
  try {
    const museoEliminado = await service.remove(req.params.id);

    if (!museoEliminado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Museo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el museo' });
  }
});

export default router;
```

---

# 6. Explicación detallada endpoint por endpoint

## Endpoint 1: Consulta general

### Ruta

```http
GET /museos
```

### ¿Para qué sirve?

Sirve para pedirle al backend la lista completa de museos.

### ¿Qué pasa internamente?

1. El cliente hace una petición `GET` a `/museos`.
2. Express entra en `router.get('/museos', ...)`.
3. El controlador llama a `service.getAll()`.
4. El service ejecuta `MUSEO.findAll()`.
5. Sequelize consulta la base.
6. Se devuelve un array JSON con todos los museos.

### Respuesta esperada

```json
[
  {
    "id": 1,
    "nombre": "Museo del Prado",
    "ubicacion": "Madrid, España",
    "exposiciones": "Clásicos del Renacimiento",
    "horarios": "09:00 - 18:00",
    "precioEntrada": "15€"
  }
]
```

### ¿Qué enseñar acá?

Este endpoint representa la **consulta masiva** de datos. Es la operación más simple para introducir cómo un frontend o Postman puede pedir información al backend.

---

## Endpoint 2: Consulta individual por id

### Ruta

```http
GET /museos/:id
```

Ejemplo real:

```http
GET /museos/3
```

### ¿Para qué sirve?

Sirve para traer un único museo usando su id.

### ¿Qué pasa internamente?

1. El cliente manda un `GET` con un id en la URL.
2. Express guarda ese valor en `req.params.id`.
3. El controlador llama a `service.getById(req.params.id)`.
4. El service ejecuta `findByPk(id)`.
5. Si existe, se devuelve ese objeto.
6. Si no existe, se responde con `404`.

### Respuesta si existe

```json
{
  "id": 3,
  "nombre": "Museo de Arte Moderno de Buenos Aires",
  "ubicacion": "Buenos Aires, Argentina",
  "exposiciones": "Arte Contemporáneo Latinoamericano",
  "horarios": "10:00 - 19:00",
  "precioEntrada": "500 ARS"
}
```

### Respuesta si no existe

```json
{
  "mensaje": "Museo no encontrado"
}
```

### ¿Qué enseñar acá?

Acá aparece el concepto de **parámetro de ruta**. Es importante que entiendan que `:id` no es texto fijo, sino un valor variable que viene en la URL.

---

## Endpoint 3: Alta de un museo

### Ruta

```http
POST /museos
```

### ¿Para qué sirve?

Sirve para crear un museo nuevo enviando los datos en el body.

### ¿Qué pasa internamente?

1. El cliente manda una petición `POST`.
2. En el body viaja un JSON con los datos del nuevo museo.
3. Gracias a `app.use(Express.json())`, Express transforma ese JSON y lo deja disponible en `req.body`. fileciteturn0file3
4. El controlador llama a `service.create(req.body)`.
5. El service usa `MUSEO.create(data)`.
6. Sequelize inserta una nueva fila en la base.
7. El backend responde con `201 Created` y devuelve el museo creado.

### Body de ejemplo para Postman

```json
{
  "nombre": "Museo Larreta",
  "ubicacion": "Buenos Aires, Argentina",
  "exposiciones": "Arte español",
  "horarios": "13:00 - 19:00",
  "precioEntrada": "800 ARS"
}
```

### Respuesta esperada

```json
{
  "id": 11,
  "nombre": "Museo Larreta",
  "ubicacion": "Buenos Aires, Argentina",
  "exposiciones": "Arte español",
  "horarios": "13:00 - 19:00",
  "precioEntrada": "800 ARS"
}
```

### ¿Qué enseñar acá?

Acá los alumnos ven el concepto de **alta** y la diferencia entre mandar datos por URL y mandar datos por body.

---

## Endpoint 4: Modificación de un museo

### Ruta

```http
PUT /museos/:id
```

Ejemplo real:

```http
PUT /museos/2
```

### ¿Para qué sirve?

Sirve para modificar un museo ya existente.

### ¿Qué pasa internamente?

1. El cliente manda el id por la URL.
2. Manda los nuevos datos por el body.
3. El controlador llama a `service.update(req.params.id, req.body)`.
4. El service busca primero el museo.
5. Si no existe, devuelve `null`.
6. Si existe, ejecuta `museo.update(data)`.
7. Se responde con el museo actualizado.

### Body de ejemplo para Postman

```json
{
  "nombre": "Louvre Actualizado",
  "ubicacion": "París, Francia",
  "exposiciones": "Arte clásico y egipcio",
  "horarios": "08:00 - 20:00",
  "precioEntrada": "20€"
}
```

### Respuesta esperada

```json
{
  "id": 2,
  "nombre": "Louvre Actualizado",
  "ubicacion": "París, Francia",
  "exposiciones": "Arte clásico y egipcio",
  "horarios": "08:00 - 20:00",
  "precioEntrada": "20€"
}
```

### ¿Qué enseñar acá?

Este endpoint les permite ver que **modificar no es crear**. Primero hay que identificar qué registro se quiere cambiar, y después aplicar el cambio.

---

## Endpoint 5: Baja de un museo

### Ruta

```http
DELETE /museos/:id
```

Ejemplo real:

```http
DELETE /museos/5
```

### ¿Para qué sirve?

Sirve para borrar un museo de la base.

### ¿Qué pasa internamente?

1. El cliente manda un `DELETE` con el id.
2. El controlador llama a `service.remove(req.params.id)`.
3. El service busca el museo.
4. Si no existe, devuelve `null`.
5. Si existe, ejecuta `destroy()`.
6. El backend responde con un mensaje de confirmación.

### Respuesta esperada

```json
{
  "mensaje": "Museo eliminado correctamente"
}
```

### ¿Qué enseñar acá?

Acá aparece la operación de **baja**. Es ideal para explicar la diferencia entre baja física y baja lógica.

---

# 7. Cómo levantar el proyecto

En tu `package.json` no hay un script `start` ni `dev`; solo aparece `test`. fileciteturn0file6

Entonces, para ejecutarlo, lo más directo es correr:

```bash
node app.js
```

Como en `app.js` el servidor escucha en el puerto `3021`, la API quedará disponible en:

```bash
http://localhost:3021
```

Y las rutas quedarían así:

- `GET http://localhost:3021/museos`
- `GET http://localhost:3021/museos/1`
- `POST http://localhost:3021/museos`
- `PUT http://localhost:3021/museos/1`
- `DELETE http://localhost:3021/museos/1` fileciteturn0file3

> Si querés dejarles una mejora a los chicos, podés agregar en `package.json`:

```json
"scripts": {
  "start": "node app.js"
}
```

Y así ya pueden levantarlo con:

```bash
npm start
```

---

# 8. Cómo probar cada endpoint en Postman

## Probar GET todos

- Método: `GET`
- URL: `http://localhost:3021/museos`
- No lleva body.

## Probar GET por id

- Método: `GET`
- URL: `http://localhost:3021/museos/1`
- No lleva body.

## Probar POST

- Método: `POST`
- URL: `http://localhost:3021/museos`
- Ir a `Body` → `raw` → `JSON`
- Pegar el JSON del museo nuevo.

## Probar PUT

- Método: `PUT`
- URL: `http://localhost:3021/museos/1`
- Ir a `Body` → `raw` → `JSON`
- Pegar el JSON actualizado.

## Probar DELETE

- Método: `DELETE`
- URL: `http://localhost:3021/museos/1`
- No lleva body.

---

# 9. Orden mental que deberían aprender los alumnos

Para que entiendan cómo se construye cualquier endpoint, podés enseñarles siempre esta secuencia:

1. **Pensar la ruta**: qué URL y qué verbo HTTP necesita.
2. **Crear el endpoint en el controller**: definir `get`, `post`, `put` o `delete`.
3. **Llamar al service**: no meter lógica de base de datos en el controller.
4. **Programar la lógica en el service**: consultar, crear, actualizar o borrar.
5. **Asegurarse de que el modelo tenga los campos correctos**.
6. **Probar en Postman**.

Ese orden les sirve no solo para este ejercicio, sino para cualquier API CRUD simple.

---

# 10. Código completo final por archivo

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
import { Op } from "sequelize";

async function getAll() {
  return await MUSEO.findAll();
}

async function getById(id) {
  return await MUSEO.findByPk(id);
}

async function create(data) {
  return await MUSEO.create(data);
}

async function update(id, data) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.update(data);
  return museo;
}

async function remove(id) {
  const museo = await MUSEO.findByPk(id);

  if (!museo) {
    return null;
  }

  await museo.destroy();
  return museo;
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
```

## `controllerMUSEO.js`

```js
import { Router } from 'express';
import service from '../service/serviceMUSEOS.js';

const router = Router();

router.get('/museos', async (req, res) => {
  try {
    const museos = await service.getAll();
    res.status(200).json(museos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los museos' });
  }
});

router.get('/museos/:id', async (req, res) => {
  try {
    const museo = await service.getById(req.params.id);

    if (!museo) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el museo' });
  }
});

router.post('/museos', async (req, res) => {
  try {
    const nuevoMuseo = await service.create(req.body);
    res.status(201).json(nuevoMuseo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el museo' });
  }
});

router.put('/museos/:id', async (req, res) => {
  try {
    const museoActualizado = await service.update(req.params.id, req.body);

    if (!museoActualizado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json(museoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el museo' });
  }
});

router.delete('/museos/:id', async (req, res) => {
  try {
    const museoEliminado = await service.remove(req.params.id);

    if (!museoEliminado) {
      return res.status(404).json({ mensaje: 'Museo no encontrado' });
    }

    res.status(200).json({ mensaje: 'Museo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el museo' });
  }
});

export default router;
```

---

# 11. Conclusion

Con este ejemplo pueden entender una idea fundamental del backend: un endpoint no es solo una ruta, sino un recorrido completo.

Primero entra la petición por una URL y un verbo HTTP. Después el controller recibe esa petición. Luego el service aplica la lógica y se comunica con el modelo. Finalmente Sequelize impacta en la base de datos y la respuesta vuelve al cliente en formato JSON.

Si entienden este recorrido en este ejemplo de museos, después pueden replicarlo casi igual para cualquier otra entidad: alumnos, productos, usuarios, reservas o películas.
