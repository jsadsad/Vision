# D3

D3 stands for Data Driven Documents.

## SVG (Scalable Vector Graphics)

- XML syntax.
- Each shape is a DOM element
- Easy to get started and interact with
- not performant at large scale.
- Like an illustrator
- `x` increases going right, `y` increases going down
- Just like with HTML elements, the order in which you create and insert into DOM dictates the order in which they get rendered.

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

- D3 creates the **data** property in the DOMElements.
- `datum` adds that **data** property
- `data` appends the data individually in separate select elements.
- `data` can take in an array or function that would return an array.

## Simple Graph

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

## Creating DOM elements from Data

IMPORTANT: `.data` => `.enter` => `.append`

The data must be an array so D3 will know it can be mapped.

With an empty selection from `.selectAll('something')`, D3 will go ahead and calculate out how to find and match our data. `.enter()` will pluck out the enter selection returns the placeholders with the data already binded to it. `.append('something')` will insert the element with appropriate data bound it it.

## Translate

When we set `translate()` on an SVG element, we're moving around its coordinate system.

## Group

The `<g>` stands for `group`. It helps us to group all the children elements together so that we can manipulate its attributes all together. <g> elements don't render anything.

What the selection is. Represents our update selection.

```
// create group elements
{
  const svg = html`<svg width=${width} height=${svgHeight}></svg>`

// create group elements
  const g = d3.select(svg)
  .selectAll('g')
  .data(flowers)
  .enter()
  .append('g')
  .attr('transform', d => `translate(${d.translate})`)


  g.selectAll('path')
    .data(d => {
    return _.times(d.numPetals, i =>
                   Object.assign({}, d, {rotate: i * (360 / d.numPetals)}))
  }).enter().append('path')
  .attr('transform', d => `rotate(${d.rotate})scale(${d.scale})`)
  .attr('d', d=> d.path)
  .attr('fill', d => d.color)
  .attr('stroke', d => d.color)
  .attr('fill-opacity', 0.5)
  .attr('stroke-width', 2)

  g.append('text')
    .text(d => _.truncate(d.title, 18))
    .style('font-style', 'italic')
    .style('font-size', '.7em')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')


  return scrollSVG(svg)
}
```

## D3 Scales

We use D3 scales to translate our raw data into visual channels that we use to render to the DOM.

Most common data types include: quantitative(rating out of 10), temporal(release dates), spatial(city, country), nominal(genres), ordinal(parent guidance ratings, t-shirt sizes)

## Rotate vs Translate

The ordering matters.

Good rule of thumb is to `translate` first, and then `rotate` after.

```
<rect x=0 y=0 transform='rotate(0)translate(0,0)' />
```

## Key Function

We tell D3 what to access in the bound data to control which `datum` is assigned to which elements in a selection.

## Updating the DOM

The enter-exit pattern is extremely powerful when combined with transitions.

The old way:

```
updateBarsOld = (svg, data) => {
  const rectWidth = 50

  const rect = d3.select(svg).selectAll('rect')
  .data(data, d => d) //data bound

  //exit
  rect.exit().remove() //important to remove everythuing first.

  //enter with attributes that do not depend on data.
  const enter = rect.enter().append('rect')
  .attr('width', rectWidth)
  .attr('fill', 'pink')
  .attr('stroke','tomato')

  //enter + update
  enter.merge(rect)
  .attr('x', (d, i) => i * rectWidth) //merge with attributes that depend on data.
  .attr('y', d => 100 - d)
  .attr('height', d => d)

}
```

The new way:

```
d3.select(svg).selectAll('rect')
  .data(newData, d => d)
  .join('rect') // takes care of enter & exit in one
  // returns the enter+update selection,
  // so we can set all our attributes on it:
  .attr('x', (d, i) => i * rectWidth)
  .attr('width', rectWidth)
  ...

If we want access to specific selections to operate on them:

d3.select(svg).selectAll('rect')
  .data(newData, d => d)
  .join(
    enter => {
      // return so it can be joined with update selection
      return enter.append('rect')
        // set attributes etc. on only enter selection
    },
    update => update,
    exit => {
      // do something with exit selection
    }
  )
  // .join() returns enter+update selection
  // so can also chain attributes here
```

```
updateBarsNew = (svg, data) => {
  const rectWidth = 50

  d3.select(svg).selectAll('rect')
  .data(data, d => d)
  .join('rect')
  .attr('x', (d, i) => i * rectWidth)
  .attr('y', d => 100 - d)
  .attr('height', d => d)
  .attr('width', rectWidth)
  .attr('fill', 'skyblue')
  .attr('stroke', 'plum')
  .attr('stroke-width', 2)

}
```

## Transitions

Transition are how we animate attributes and styles from one state to the next in D3.js. This is really inmportant for us to main object constancy.

Use greensock for advance animations.

`const t = d3.transition().duration(1000)`

```
{
  const rectWidth = 50
  const svgHeight = 100

  const svg = html`<svg height=${svgHeight} style='overflow: visible' />`
  const code = html`<code />`
  const button = html`<button>new data!</button>`

  function updateBars() {
    // select svg so that transition can be localized within selection
    const t = d3.select(svg).transition().duration(1000)

    // randomly generate an array of data
    const data = _.times(_.random(3, 8), i => _.random(0, 100))

    // update rectangles
    const rect = d3.select(svg)
      .selectAll('rect').data(data, d => d)
      .join(
        enter => {
          const rect = enter.append('rect')
            //attributes to transition FROM
            .attr('width', rectWidth)
            .attr('stroke-width', 3)
            .attr('stroke', 'plum')
            .attr('fill', 'pink')
            // overwrite the default so the animation looks better:
            .attr('x', (d, i) => i * rectWidth)
            .attr('y', svgHeight)
            .attr('height', 0)

          return rect
        },
        update => update,
        exit => {
          exit.transition(t)
          // everything after here is transition TO
            .attr('y', svgHeight)
            .attr('height', 0)
            .remove()
        },
      )
      // animate enter + update selection
      .transition(t)
      //attributes to transition TO
      .attr('x', (d, i) => i * rectWidth)
      .attr('y', d => 100 - d)
      .attr('height', d => d)

    // update div with new data array:
    d3.select(code).text(JSON.stringify(data).replace(/\,/g, ', '))
  }

  updateBars()
  d3.select(button).on('click', updateBars)

  return html`
    ${svg}
    <p>
    ${button} ${code}
    </p>
  `
}
```

## Filtering

```
{
  // this line is a little bit of Observable magic to make sure that every time
  // our filter cells update, we use the existing SVG element instead of trashing it and creating a new one
  // if you're working in your index.html, you'd create your svg element and select it as we did before
  const element = this || scrollSVG(html`<svg width=${width} height=${svgHeight}></svg>`)

  const svg = d3.select(element).select('svg')

  // create transition animation localized to svg selection
  const t = svg.transition().duration(1000)
  const g = svg.selectAll('g')
  .data(filteredFlowers, d => d.title)
  .join(
    enter => {
      const g = enter.append('g')
      .attr('opacity', 0)
      .attr('transform', d => `translate(${d.translate})`)
      // create paths and texts
      g.selectAll('path')
        .data(d => _.times(d.numPetals, i => {
        return {rotate: i * (360 / d.numPetals),...d}
      })).join('path')
      .attr('transform', d => `rotate(${d.rotate})scale(${d.scale})`)
      .attr('d', d => d.path)
      .attr('fill', d => d.color)
      .attr('stroke', d => d.color)
      .attr('fill-opacity', 0.5)
      .attr('stroke-width', 2)

      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '0.7em')
        .text(d => _.truncate(d.title, {length: 20}))

      return g

    },
    update => update,
    exit => {
    exit.transition(t)
      .attr('opacity', 0).remove()
    }
  ).transition(t)
  .attr('opacity', 1)
  .attr('transform', d => `translate(${d.translate})`)


  return element
}
```

## Filtering and Animation

```
{
  // this line is a little bit of Observable magic to make sure that every time
  // our filter cells update, we use the existing SVG element instead of trashing it and creating a new one
  // if you're working in your index.html, you'd create your svg element and select it as we did before
  const element = this || scrollSVG(html`<svg width=${width} height=${svgHeight}></svg>`)

  const svg = d3.select(element).select('svg')

  // create transition animation localized to svg selection
  const t = svg.transition().duration(1000)
  const g = svg.selectAll('g')
  .data(filteredFlowers, d => d.title)
  .join(
    enter => {
      const g = enter.append('g')
      .attr('opacity', 0)
      .attr('transform', d => `translate(${d.translate})`)
      // create paths and texts
      g.selectAll('path')
        .data(d => _.times(d.numPetals, i => {
        return {rotate: i * (360 / d.numPetals),...d}
      })).join('path')
      .attr('transform', d => `rotate(${d.rotate})scale(${d.scale})`)
      .attr('d', d => d.path)
      .attr('fill', d => d.color)
      .attr('stroke', d => d.color)
      .attr('fill-opacity', 0.5)
      .attr('stroke-width', 2)

      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '0.7em')
        .text(d => _.truncate(d.title, {length: 20}))

      return g

    },
    update => update,
    exit => {
    exit.transition(t)
      .attr('opacity', 0).remove()
    }
  ).transition(t)
  .attr('opacity', 1)
  .attr('transform', d => `translate(${d.translate})`)


  return element
}
```

## Shapes

D3.js shape functions help us calculate the path strings we need to draw line charts, area charts, pie charts, etc. They take in raw data and return path strings.

## Hierarchy

D3.js hierarchy helps us calculate the x, y-positions and (where applicable) the width, height, radius for trees, tree maps, circle maps, etc. They also take in the raw data and return new objects without mutating the original data.

## Force

Force directly mutates the data we pass in and requires upwards of thousands of calculations instead of one single one.

## Force example

```
{
  // this line is a little bit of Observable magic to make sure that every time
  // our filter cells update, we use the existing SVG element instead of trashing it and creating a new one
  // if you're working in your index.html, you'd create your svg element and select it as we did before
  const svg = this || html`<svg width=${width} height=${width / 2}></svg>`

  mutable graph = calculateGraph(graph)

  // ✨ OUR CODE HERE
  const link = d3.select(svg).selectAll('.link')
  .data(graph.links, d => d.id)
  .join('line')
  .classed('link', true)
  .attr('stroke', '#ccc')
  .attr('opacity', 0.5)

  //flowers

  // create flowers
  const flower = d3.select(svg).selectAll('.flower')
    .data(graph.nodes, d => d.title)
    .join(
      enter => {
        const g = enter.append('g')
          .classed('flower', true)

        // create petals & titles
        g.selectAll('path')
          .data(d => _.times(d.numPetals, i =>
             Object.assign({}, d, {rotate: i * (360 / d.numPetals)})))
          .join('path')
          .attr('transform', d => `rotate(${d.rotate})scale(${0.5 * d.scale})`)
          .attr('fill-opacity', 0.5)
          .attr('d', d => d.path)
          .attr('fill', d => d.color)
          .attr('stroke', d => d.color)
        g.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .style('font-size', '.5em')
          .style('font-style', 'italic')
          .text(d => _.truncate(d.title, {length: 20}))

        return g
      }
    )

  //genres
  const genres = d3.select(svg).selectAll('.genre')
  .data(graph.genres, d => d.label)
  .join('text')
  .classed('genre', true)
  .text(d => d.label)
  .attr('text-anchor', 'middle')

  // use force similation
  const nodes = _.union(graph.nodes, graph.genres)
  const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(graph.links))
  .force('collide', d3.forceCollide(d => d.scale * 100))
  .force('center', d3.forceCenter(width / 2, width / 4))
  .on('tick', () => {
    flower.attr('transform', d => `translate(${d.x}, ${d.y})`)
    genres.attr('transform', d => `translate(${d.x}, ${d.y})`)
    link.attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.source.x)
    .attr('y2', d => d.source.y)
  })

  invalidation.then(() => simulation.stop())

  return svg
}
```
