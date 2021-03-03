const rectWidth = 50
const svgHeight = 100

const container = d3.select('#app')
const svg = container
  .append('svg')
  .attr('height', svgHeight)
  .attr('width', rectWidth)
  .style('overflow', 'visible')

const buttonCode = container.append('div')
const button = buttonCode.append('button').text('Marvel').attr('class', 'button-code')
const code = buttonCode.append('code')

function updateBars() {
  const t = d3.transition().duration(1000)

  const data = _.times(_.random(3, 8), (i) => _.random(0, 100))

  d3.select(svg.node())
    .selectAll('rect')
    .data(data, (d) => d)
    .join(
      (enter) => {
        return (
          enter
            .append('rect')
            .attr('x', (d, i) => i * rectWidth)
            .attr('height', 0)
            .attr('y', svgHeight)
            .attr('fill', '#ed1d24')
            .attr('stroke', 'gainsboro')
            .attr('stroke-width', 2)
        )
      },
      (update) => update,
      (exit) => {
        exit
          .transition(t)
          .attr('height', 0)
          .attr('y', svgHeight)
      }
    ) // enter + update selection
    .attr('width', rectWidth)
    .transition(t)
    .attr('x', (d, i) => i * rectWidth)
    .attr('height', (d) => d)
    .attr('y', (d) => svgHeight - d)

  d3.select(code.node()).text(JSON.stringify(data).replace(/\,/g, ', '))
}

updateBars()
d3.select(button.node()).on('click', updateBars)
