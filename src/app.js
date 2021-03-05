window.onbeforeunload = () => {
  window.scrollTo(0, 0)
}

window.onscroll = () => {
  scrollFunction()
}

scrollTopButton = document.getElementById('topBtn')

const apppendNavLi = (idx) => {
  let navColumn = document.querySelector('.nav-column')
  let ankLink = document.createElement('a')
  ankLink.setAttribute('href', `#mcu-${idx}`)
  navColumn.appendChild(ankLink)

  let navLi = document.createElement('li')
  navLi.setAttribute('id', `mcu-li-${idx}`)
  navLi.classList.add('mcu-li')
  ankLink.appendChild(navLi)
}

const appendAnchor = (idx) => {
  let movieContainer = document.getElementById(`mov-${idx}`)

  let aTag = document.createElement('a')
  aTag.setAttribute('id', `mcu-${idx}`)
  aTag.classList.add('mcu')
  movieContainer.appendChild(aTag)
}

const rectWidth = 225
const svgHeight = 250
const t = d3.transition().duration(2000)

// let xscale = d3.scaleLinear().domain([0, 100]).range([0, 100])

let yscale = d3.scaleLinear().domain([3, 0]).range([0, 250])

let y_axis = d3
  .axisLeft()
  .scale(yscale)
  .ticks(3)
  .tickFormat((d) => {
    if (d !== 0) return d + 'billion'
  })

// let x_axis = d3.axisBottom().scale(xscale)

let svg = d3.select('body').append('svg').attr('width', 500).attr('height', 300)

let defs = svg.append('defs')

let gradient = defs
  .append('linearGradient')
  .attr('id', 'svgGradient')
  .attr('x1', '0%')
  .attr('x2', '100%')
  .attr('y1', '0%')
  .attr('y2', '100%')

gradient
  .append('stop')
  .attr('class', 'start')
  .attr('offset', '0%')
  .attr('stop-color', 'rgb(214,183,33)')
  .attr('stop-opacity', 2)

gradient
  .append('stop')
  .attr('class', 'end')
  .attr('offset', '100%')
  .attr('stop-color', 'rgb(31,131,51)')
  .attr('stop-opacity', 2)

d3.json('movies.json', (d) => {
  return {
    title: d['title'],
    released: d['released'],
    rating: d['rating'],
    budget: sizeScale(d.budget),
    gross: sizeScale(d.gross),
  }
}).then((data) => {
  movieData = data

  const size = d3.scaleLinear().domain([0, 2800]).range([0, 250])

  for (let i = 0; i < movieData.length; i++) {
    const svg = d3
      .select(`#mov-${i}`)
      .append('div')
      .append('svg')
      .attr('height', svgHeight)
      .attr('width', rectWidth)
      .style('overflow', 'visible')
    d3.scaleLinear().domain([0, 42.195]).range([0, 600])

    d3.select(svg.node())
      .selectAll('rect')
      .data([size(movieData[i].gross), size(movieData[i].budget)])
      .enter()
      .append('rect')
      .transition(t)
      .attr('width', rectWidth)
      .attr('x', (d, i) => i * rectWidth)
      .attr('y', (d) => svgHeight - d)
      .attr('height', (d) => d)
      .attr('fill', 'url(#svgGradient)')
      .attr('stroke', 'rgb(221,0,29)')
      .attr('stroke-width', 2)

    d3.select(svg.node()).attr('transform', 'translate(150, 50)').call(y_axis)
    appendAnchor(i)
    apppendNavLi(i)
  }
})

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollTopButton.style.display = 'block'
  } else {
    scrollTopButton.style.display = 'none'
  }
}

function topFunction() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
