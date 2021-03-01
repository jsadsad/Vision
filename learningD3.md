# D3 

D3 stands for Data Driven Documents.

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
- Data creates what is in the DOM.

# Binding in D3

- D3 creates the __data__ property in the DOMElements.
- `datum` adds that __data__ property
- `data` appends the data individually in separate select elements.


# Simple Graph

```
const rectWidth = 200
  
  const svg = html`
    <svg width=${rectWidth * barData.length} height=100 style='border: 1px dashed'>
      <rect />
      <rect />
      <rect />
      <rect />
      <rect />
    </rect>
  `
 
  d3.select(svg).selectAll('rect')
    .data(barData)
    .attr('x', (d, i) => i * rectWidth)
    .attr('y', (d,i) => 100 - d)
    .attr('height', d => d)
    .attr('width', rectWidth)
    .attr('stroke-width', 3)
    .attr('stroke-dasharray', '5 5')
    .attr('stroke', 'plum')
    .attr('fill', 'pink')
  
  return svg
}
```

# Creating DOM elements from Data

IMPORTANT: `.data` => `.enter` => `.append`

The data must be an array so D3 will know it can be mapped.

With an empty selection from `.selectAll('something')`, D3 will go ahead and calculate out how to find and match our data. `.enter()` will pluck out the enter selection returns the placeholders with the data already binded to it. `.append('something')` will insert the element with appropriate data bound it it.

## Translate

When we set `translate()` on an SVG element, we're moving around its coordinate system.

# D3 Scales

We use D3 scales to translate our raw data into visual channels that we use to render to the DOM.

Most common data types include: quantitative(rating out of 10), temporal(release dates), spatial(city, country), nominal(genres), ordinal(parent guidance ratings, t-shirt sizes)