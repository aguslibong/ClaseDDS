# Ejercicio: Bootstrap Grid Express

## Objetivo
Aprender a utilizar el sistema de grillas de Bootstrap para crear diseños responsive.

## Consigna
Debés construir una fila con 3 columnas que se comporten de la siguiente manera:

- En escritorio (pantallas medianas o grandes): mostrar 3 columnas iguales en una misma fila.
- En celular (pantallas pequeñas): mostrar 1 columna por fila.

Cada columna debe contener una caja con texto identificando su número.

## Importante
Debés usar Bootstrap.

## Pasos sugeridos

### Parte 1 - Preparar proyecto
1. Crear archivo `index.html`.
2. Vincular Bootstrap usando CDN o instalación local.
3. Crear estructura HTML básica.

### Parte 2 - Armar grid
1. Crear un contenedor `.container`.
2. Dentro agregar una `.row`.
3. Dentro de la fila agregar 3 columnas.
4. Usar clases responsive para escritorio y mobile.

### Parte 3 - Contenido visual
Dentro de cada columna agregar:

- Columna 1
- Columna 2
- Columna 3

### Parte 4 - Probar responsive
1. Abrir el navegador.
2. Activar modo celular (F12).
3. Reducir ancho de pantalla.
4. Verificar que las columnas se apilen.

## Qué observar
- En desktop las 3 cajas aparecen lado a lado.
- En mobile las cajas bajan una debajo de otra.
- No hizo falta escribir media queries en CSS.

## Resultado esperado
Desktop:

[1] [2] [3]

Mobile:

[1]
[2]
[3]

## Conclusión
Bootstrap utiliza un sistema de 12 columnas responsive.

Con clases como:

- `col-12`
- `col-md-4`

podemos cambiar automáticamente el diseño según el tamaño de pantalla.