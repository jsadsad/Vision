// const width = window.innerWidth
// const height = window.innerHeight
const rectWidth = 100
const svgHeight = 250
const t = d3.transition().duration(1000)

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

  const sizeGross = d3
    .scaleLinear()
    .domain(d3.extent(movieData, (d) => d.gross))
    .range([0, 250])

  const sizeBudget = d3
    .scaleLinear()
    .domain(d3.extent(movieData, (d) => d.budget))
    .range([0, 250])

  const size = d3.scaleLinear().domain([0, 2800]).range([0, 250])

  for (let i = 0; i < 23; i++) {
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
      // .data([sizeGross(movieDasizeta[i].gross), sizeBudget(movieData[i].budget)])
      // .data(Object.values(movieData[i]).slice(3))
      .enter()
      .append('rect')
      .attr('width', rectWidth)
      .transition(t)
      .attr('x', (d, i) => i * rectWidth) // [0] = 100, [1] = 200
      .attr('y', (d) => svgHeight - d)
      .attr('height', (d) => d)
      .attr('fill', '#ed1d24')
      .attr('stroke', 'gainsboro')
      .attr('stroke-width', 2)
  }
})

// const container = d3.selectAll('#app')
// const svg = container
//   .append('svg')
//   .attr('height', svgHeight)
//   .attr('width', rectWidth)
//   .style('overflow', 'visible')

// const buttonCode = container.append('div')
// const button = buttonCode
//   .append('button')
//   .text('Marvel')
//   .attr('class', 'button-code')
// const code = buttonCode.append('code')

// const updateBars = () => {
//   const t = d3.transition().duration(1000)
//   const data = _.times(_.random(3, 8), (i) => _.random(0, 100))
//   d3.select(svg.node())
//     .selectAll('rect')
//     .data(data, (d) => d)
//     .join(
//       (enter) => {
//         return enter
//           .append('rect')
//           .attr('x', (d, i) => i * rectWidth)
//           .attr('height', 0)
//           .attr('y', svgHeight)
//           .attr('fill', '#ed1d24')
//           .attr('stroke', 'gainsboro')
//           .attr('stroke-width', 2)
//       },
//       (update) => update,
//       (exit) => {
//         exit.transition(t).attr('height', 0).attr('y', svgHeight)
//       }
//     ) // enter + update selection
//     .attr('width', rectWidth)
//     .transition(t)
//     .attr('x', (d, i) => i * rectWidth)
//     .attr('height', (d) => d)
//     .attr('y', (d) => svgHeight - d)

//   d3.select(code.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
// }
// // d3.json('movies.json').then((movie) => {})
// updateBars()
// d3.select(button.node()).on('click', updateBars)

// const testCode = container.append('div')
// const tes = testCode.append('div').text('get shit done')
// const tes2 = testCode.append('div').text('test')

// function calculateData(movies) {
//   return _.map(movies, (data, i) => {
//     debugger
//     return {
//       title: data.title,
//       releaseDate: data.released,
//       rating: data.rating,
//       gross: data.gross,
//     }
//   })
// }

// d3.json('movies.json', (d) => {
//   return {
//     title: d['title'],
//     released: d['released'],
//     rating: d['rating'],
//     gross: d['budget'],
//   }
// }).then((data) => {
//   movieData = data
//   calculateData(movieData)
//   // createVisualization(nutritionData[0], 0, true)
//   // createNavLi(0)
//   // createAnchor(0)

//   // for (let i = 1; i < nutritionData.length; i++) {
//   //   createVisualization(nutritionData[i], i)
//   //   createNavLi(i)
//   //   createAnchor(i)
//   // }
// })

// const calculateData = (movieData, idx) => {
//   const t = d3.transition().duration(1000)
//   const margin = {
//     top: 20,
//     right: 30,
//     bottom: 30,
//     left: 40,
//   }
//   let width = 600 - margin.left - margin.right
//   let height = 475 - margin.top - margin.bottom
//   d3.select(svg.node())
//     .selectAll('rect')
//     .data(movieData[0], (d) => d)
//     .join(
//       (enter) => {
//         return enter
//           .append('rect')
//           .attr('x', (d, i) => i * rectWidth)
//           .attr('height', 0)
//           .attr('y', svgHeight)
//           .attr('fill', '#ed1d24')
//           .attr('stroke', 'gainsboro')
//           .attr('stroke-width', 2)
//       },
//       (update) => update,
//       (exit) => {
//         exit.transition(t).attr('height', 0).attr('y', svgHeight)
//       }
//     ) // enter + update selection
//     .attr('width', rectWidth)
//     .transition(t)
//     .attr('x', (d, i) => i * rectWidth)
//     .attr('height', (d) => d)
//     .attr('y', (d) => svgHeight - d)

//   d3.select(code.node()).text(JSON.stringify(movieData).replace(/\,/g, ', '))
// }

// d3.json('movies.json').then((data) => {})

// const iron1 = d3.selectAll('#iron-1')
// const svg2 = iron1
//   .append('svg2')
//   .attr('height', svgHeight)
//   .attr('width', rectWidth)
//   .style('overflow', 'visible')

// const buttonCode = iron1.append('div')
// const button1 = buttonCode
//   .append('button')
//   .text('Marvel')
//   .attr('class', 'button-code')
// const code1 = buttonCode.append('code')

// const updateBars = () => {
//   const t = d3.transition().duration(1000)
//   const data = _.times(_.random(3, 8), (i) => _.random(0, 100))
//   d3.select(svg2.node())
//     .selectAll('rect')
//     .data(data, (d) => d)
//     .join(
//       (enter) => {
//         return enter
//           .append('rect')
//           .attr('x', (d, i) => i * rectWidth)
//           .attr('height', 0)
//           .attr('y', svgHeight)
//           .attr('fill', '#ed1d24')
//           .attr('stroke', 'gainsboro')
//           .attr('stroke-width', 2)
//       },
//       (update) => update,
//       (exit) => {
//         exit.transition(t).attr('height', 0).attr('y', svgHeight)
//       }
//     ) // enter + update selection
//     .attr('width', rectWidth)
//     .transition(t)
//     .attr('x', (d, i) => i * rectWidth)
//     .attr('height', (d) => d)
//     .attr('y', (d) => svgHeight - d)

//   // d3.select(code1.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
// }
// d3.json('movies.json').then((movie) => {})
// updateBars()
// d3.select(button1.node()).on('click', updateBars)

// let hulk1 = d3.selectAll('#hulk-1')
// const svg = hulk1
//   .append('svg')
//   .attr('height', svgHeight)
//   .attr('width', rectWidth)
//   .style('overflow', 'visible')

// const buttonCode2 = hulk1.append('div')
// const button2 = buttonCode2
//   .append('button')
//   .text('Marvel')
//   .attr('class', 'button-code')
// const code2 = buttonCode.append('code')

// const updateBars2 = () => {
//   const t = d3.transition().duration(1000)
//   const data = _.times(_.random(3, 8), (i) => _.random(0, 100))
//   d3.select(svg.node())
//     .selectAll('rect')
//     .data(data, (d) => d)
//     .join(
//       (enter) => {
//         return enter
//           .append('rect')
//           .attr('x', (d, i) => i * rectWidth)
//           .attr('height', 0)
//           .attr('y', svgHeight)
//           .attr('fill', '#ed1d24')
//           .attr('stroke', 'gainsboro')
//           .attr('stroke-width', 2)
//       },
//       (update) => update,
//       (exit) => {
//         exit.transition(t).attr('height', 0).attr('y', svgHeight)
//       }
//     ) // enter + update selection
//     .attr('width', rectWidth)
//     .transition(t)
//     .attr('x', (d, i) => i * rectWidth)
//     .attr('height', (d) => d)
//     .attr('y', (d) => svgHeight - d)

//   d3.select(code2.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
// }
// // d3.json('movies.json').then((movie) => {})
// updateBars2()
// d3.select(button2.node()).on('click', updateBars2)

// let svg1 = d3
//   .select('.svgs')
//   .append('svg')
//   .attr('height', '150')
//   .attr('width', '400')
//   .attr('fill', '#222222')
// let svg2 = d3
//   .select('.svgs')
//   .append('svg')
//   .attr('height', '150')
//   .attr('width', '400')
//   .attr('fill', '#222222')
