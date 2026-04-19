# Ejercicio: Especificidad real en CSS + estilo inline

## Objetivo
Comprender cómo decide el navegador qué estilo aplicar cuando varias reglas CSS intentan modificar la misma propiedad.

## Consigna
Se entrega una página HTML donde un mismo elemento coincide con varias reglas CSS y además tiene un estilo inline.

Debés:

1. Leer el HTML.
2. Analizar todas las reglas CSS.
3. Predecir qué color se verá en pantalla.
4. Ejecutar el archivo.
5. Explicar por qué ganó esa regla.

## Reglas CSS entregadas

p { color:red; }
.texto { color:blue; }
#principal { color:green; }

Y además el elemento tiene:

style="color: purple;"

## Pasos sugeridos
1. Observá si el elemento coincide con:
   - etiqueta `p`
   - clase `.texto`
   - id `#principal`
2. Observá que también tiene un estilo inline.
3. Pensá cuál tiene mayor prioridad.
4. Ejecutá el archivo en el navegador.
5. Confirmá el resultado.
6. Explicalo con tus palabras.

## Qué observar
- El elemento recibe muchas reglas.
- No se aplican todos los colores.
- El navegador elige una sola prioridad final.

## Resultado esperado
El texto debe verse de color violeta (purple).

## Conclusión
El estilo inline tiene más prioridad que las reglas normales de CSS externas o internas.

Orden general:

1. Inline (`style=""`)
2. ID (`#principal`)
3. Clase (`.texto`)
4. Etiqueta (`p`)

Por eso gana el color violeta.