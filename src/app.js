window.onbeforeunload = () => {
  window.scrollTo(0, 0)
}

window.onscroll = () => {
  scrollFunction()
}

scrollTopButton = document.getElementById('topBtn')

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

const rectWidth = 90
const svgHeight = 250
const t = d3.transition().duration(2000)

let xscale = d3
  .scalePoint()
  .range([50, 215])
  .domain([' Budget ', ' Weekend 1', ' Worldwide Gross '])

let yscale = d3.scaleLinear().domain([3, 0]).range([0, 250])

let x_axis = d3.axisBottom().scale(xscale)

let y_axis = d3
  .axisLeft()
  .scale(yscale)
  .ticks(3)
  .tickFormat((d) => {
    if (d !== 0) return d + 'billion'
  })

let svg = d3.select('body').append('svg').attr('width', 100).attr('height', 100)

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
    opening: sizeScale(d.opening),
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
      .data([
        size(movieData[i].budget),
        size(movieData[i].opening),
        size(movieData[i].gross),
      ])
      .join(
        (enter) => {
          const rect = enter
            .append('rect')
            .attr('width', 80)
            .attr('stroke-width', 2)
            .attr('stroke', 'rgb(221,0,29)')
            .attr('fill', 'url(#svgGradient)')
            .attr('x', (d, i) => 50)
            .attr('y', (d) => 175)
            .attr('height', (d) => d)
          return rect
        },
        (update) => update,
        (exit) => {
          exit.transition(t).attr('y', svgHeight).attr('height', 0).remove()
        }
      )
      .transition(t)
      .attr('x', (d, i) => i * rectWidth)
      .attr('y', (d) => 250 - d)

    d3.select(svg.node())
      .append('g')
      .attr('transform', 'translate(0, 0)')
      .call(y_axis)
      .append('g')
      .attr('transform', 'translate(0, 250)')
      .call(x_axis)
    appendAnchor(i)
    apppendNavLi(i)
  }
})

function theSnap() {
  let snapGif = document.getElementById('snap')
  for (let index = 0; index < movieData.length / 2; index++) {
    let movie = document.getElementById(`mov-${index}`)
    let movieLi = document.getElementById(`mcu-li-${index}`)
    movie.remove()
    movieLi.remove()
  }
  topFunction()
  snapGif.remove()
}
