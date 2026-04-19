# Ejercicio: Selector correcto en CSS

## Objetivo
Aprender a usar selectores CSS básicos para aplicar estilos a distintos elementos de una página.

## Consigna
Se entrega un archivo HTML y una hoja de estilos vacía.

Tu trabajo consiste en escribir las reglas CSS necesarias para cumplir con lo siguiente:

- pintar **todos los párrafos**
- pintar **solo el elemento que tenga la clase** `.destacado`
- pintar **solo el elemento que tenga el id** `titulo`

## Pasos sugeridos
1. Abrí el archivo HTML y observá qué elementos tiene.
2. Identificá cuáles son los párrafos, cuál tiene clase `destacado` y cuál tiene id `titulo`.
3. En el archivo CSS, escribí una regla para seleccionar todos los `<p>`.
4. Escribí otra regla para seleccionar únicamente la clase `.destacado`.
5. Escribí una tercera regla para seleccionar únicamente el id `#titulo`.
6. Guardá los cambios y abrí la página en el navegador.
7. Verificá que cada selector afecte solo a los elementos correctos.

## Qué observar
- Que todos los párrafos cambien de estilo.
- Que solo un elemento con clase `destacado` tenga un estilo distinto.
- Que solo el elemento con id `titulo` reciba su estilo particular.
- Que cada selector afecte únicamente a lo que corresponde.

## Resultado esperado
La página debe mostrar:
- el título principal con un estilo propio
- todos los párrafos con otro estilo común
- el texto destacado con un estilo exclusivo

## Conclusión
En CSS, cada tipo de selector apunta a algo distinto:
- el selector de elemento (`p`) afecta a todas las etiquetas de ese tipo
- el selector de clase (`.destacado`) afecta a los elementos que comparten esa clase
- el selector de id (`#titulo`) afecta a un único elemento identificado de forma exclusiva

Por eso es importante elegir bien el selector según lo que se quiera modificar.