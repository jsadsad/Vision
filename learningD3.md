# D3 Notes

## SVG (Scalable Vector Graphics)

  - XML syntax.
  - Each shape is a DOM element
  - Easy to get started and interact with
  - not performant at large scale.
  - Like an illustrator
  - `x` increases going right, `y` increases going down

## Canvas

  - JavaScript API
  - One canvas element, shapes are inaccessible once drawn
  - Very performant for animation
  - hard to interact with.
  - Like photoshop

## What is D3

- Defacto JS library for creating data visualizations in the web.
- D3 can be used with anything the browser supports. 

# Binding in D3

- D3 creates the __data__ property in the DOMElements.
- `datum` adds that __data__ property
- `data` appends the data individually in separate select elements.
