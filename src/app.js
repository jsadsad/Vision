window.onload = function () {
  window.scrollTo(0, 0)
}

window.addEventListener(
  'load',
  (e) => {
    let obsSlides = []
    for (let i = 0; i <= movieData.length; i++) {
      let movContainer = '#movie-container-' + i
      let movSlide = document.querySelector(movContainer)
      obsSlides.push(movSlide)
    }
    createObs(obsSlides)
  },
  false
)

const appendNavLi = (idx) => {
  let navCol = document.querySelector('.viz-nav')
  let ankLi = document.createElement('a')
  let navLi = document.createElement('li')

  ankLi.setAttribute('href', `#anchor-${idx}`)
  navCol.appendChild(ankLi)
  navLi.setAttribute('id', `viz-nav-li-${idx}`)
  navLi.classList.add('viz-nav-li')
  ankLi.appendChild(navLi)
}

const appendAnchor = (idx) => {
  let movieContainer = document.getElementById(`movie-container-${idx}`)
  let aTag = document.createElement('a')

  aTag.setAttribute('id', `anchor-${idx}`)
  aTag.classList.add('anchor')
  movieContainer.appendChild(aTag)
}

const renderSlide = (options, slide, idx) => {
  const handleScroll = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelector(`.slide-svg-${idx}`).classList.remove('hidden')

        if (document.querySelector(`.slide-svg-${idx - 1}`)) {
          document
            .querySelector(`.slide-svg-${idx - 1}`)
            .classList.add('hidden')
        }

        if (document.querySelector(`.slide-svg-${idx + 1}`)) {
          document
            .querySelector(`.slide-svg-${idx + 1}`)
            .classList.add('hidden')
        }

        document.querySelectorAll(`.slide-svg-${idx}-rect`).forEach((rect) => {
          rect.classList.add('chart-rect')
        })

        d3.select(`.slide-svg-${idx}-y-axis`)
          .transition()
          .style('opacity', '100%')
          .duration(500)

        let navCircle = document.getElementById(`viz-nav-li-${idx}`)
        navCircle.classList.add(`viz-nav-li-${idx}`)

        if (document.querySelectorAll(`.slide-svg-${idx - 1}-rect`)) {
          document
            .querySelectorAll(`.slide-svg-${idx - 1}-rect`)
            .forEach((rect) => {
              rect.classList.remove('chart-rect')
            })

          d3.select(`.slide-svg-${idx - 1}-y-axis`)
            .transition()
            .style('opacity', '0%')
            .duration(1000)
        }

        if (document.getElementById(`viz-nav-li-${idx - 1}`)) {
          document
            .getElementById(`viz-nav-li-${idx - 1}`)
            .classList.remove(`viz-nav-li-${idx - 1}`)
        }

        if (document.querySelectorAll(`.slide-svg-${idx + 1}-rect`)) {
          document
            .querySelectorAll(`.slide-svg-${idx + 1}-rect`)
            .forEach((rect) => {
              rect.classList.remove('chart-rect')
            })

          d3.select(`.slide-svg-${idx + 1}-y-axis`)
            .transition()
            .style('opacity', '0%')
            .duration(1000)

          document
            .getElementById(`viz-nav-li-${idx + 1}`)
            .classList.remove(`viz-nav-li-${idx + 1}`)
        }
      }
    })
  }
  let observer = new IntersectionObserver(handleScroll, options)
  observer.observe(slide)
}

let movieData
d3.json('movies.json', (d) => {
  return {
    title: d['Title'],
    releaseDate: d['Release Date'],
    rating: d['Rating'],
    budget: d['Budget'],
    openingWeekend: d['World Gross'],
    usCanadaGross: d['US & Canada Gross'],
    ukGross: d['United Kingdom Gross"'],
    chinaGross: d['China Gross'],
    japanGross: d['Japan Gross'],
    germanyGross: d['Germany Gross'],
  }
}).then((data) => {
  movieData = data

  createVision(movieData[0], 0)
  appendNavLi(0)
  appendAnchor(0)

  for (let idx = 1; idx < movieData.length; idx++) {
    createVision(movieData[idx], idx)
    appendNavLi(idx)
    appendAnchor(idx)
  }
})

const createVision = (movieData, idx) => {
  let margin = { top: 10, right: 40, bottom: 25, left: 60 }
  let width = 660 - margin.left - margin.right
  let height = 450 - margin.top - margin.bottom
  let data = Object.values(movieData).slice(3)
  let numberOfColumns = 8

  let x_axisLength = width
  let targetSVG = 'slide-svg-' + idx
  let targetSlideRect = 'slide-svg-' + idx + '-rect'

  let xScale = d3.scaleLinear().domain([0, numberOfColumns]).range([20, width])

  let yScale = d3.scaleLinear().domain([10, 0]).range([25, 400])

  let svg = d3
    .select('#vision')
    .append('svg')
    .attr('class', `${targetSVG} hidden`)
    .attr('viewBox', `0 0 100 750`)
    .attr('preserveAspectRatio', 'xMinYMin meet')

  let xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickSize(0)
    .tickFormat(function (d) {
      return Object.keys(movieData).slice(3)[d]
    })

  let formatValue = d3.format('.1s')

  let yAxis = d3
    .axisLeft(yScale)
    .ticks(4)
    .tickFormat((tickCount) => {
      switch (tickCount) {
        case 10:
          return '1 billion'
          break
        case 0:
          return '1 million'
        default:
          return formatValue(tickCount) + '00 million'
      }
    })

  svg
    .append('g')
    .attr('class', `${targetSVG}-x-axis x-axis`)
    .attr(
      'transform',
      'translate(' + margin.left + ', ' + (height - margin.top) + ')'
    )
    .transition()
    .duration(3000)
    .call(xAxis)

  svg.selectAll('.x-axis text').attr('transform', function (d) {
    return 'translate(14, 35)rotate(-40)'
  })
  svg.selectAll('.x-axis text').attr('text-decoration', function (d) {
    return 'underline'
  })

  svg
    .append('text')
    .text('Source: IMDbPro')
    .attr('class', 'movie-source')
    .attr('transform', 'translate(35, ' + (height + margin.top + 75) + ')')
    .attr('font-size', '13px')
    .style('text-anchor', 'right')

  svg
    .append('g')
    .attr('class', `${targetSVG}-y-axis y-axis`)
    .attr('transform', 'translate(' + margin.left + ',0)')
    .style('opacity', '0%')
    .call(yAxis)

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', `${targetSlideRect}`)
    .attr('x', function (d, i) {
      return i * (x_axisLength / numberOfColumns) + margin.left + 20
    })
    .attr('y', function (d) {
      return yScale(d / 100)
    })
    .attr('width', x_axisLength / numberOfColumns - 1)
    .attr('height', function (d) {
      return height - yScale(d / 100) - margin.top
    })
    .transition()
    .duration(1000)

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
}

const createObs = (slides) => {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }

  for (let i = 0; i < slides.length - 1; i++) {
    renderSlide(options, slides[i], i)
  }
}
