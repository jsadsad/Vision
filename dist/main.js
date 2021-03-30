/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
document.addEventListener('DOMContentLoaded', function (e) {
  var movieData;
  d3.json('movies.json', function (d) {
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
      germanyGross: d['Germany Gross']
    };
  }).then(function (data) {
    movieData = data;
    createVision(movieData[0], 0);
    appendNavLi(0);
    appendAnchor(0);

    for (var idx = 1; idx < movieData.length; idx++) {
      createVision(movieData[idx], idx);
      appendNavLi(idx);
      appendAnchor(idx);
    }
  });

  var createVision = function createVision(movieData, idx) {
    var margin = {
      top: 10,
      right: 40,
      bottom: 25,
      left: 60
    };
    var width = 700 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;
    var data = Object.values(movieData).slice(3);
    var numberOfColumns = 8;
    var x_axisLength = width;
    var targetSVG = 'slide-svg-' + idx;
    var targetSlideRect = 'slide-svg-' + idx + '-rect';
    var xScale = d3.scaleLinear().domain([0, numberOfColumns]).range([20, width]);
    var yScale = d3.scaleLinear().domain([10, 0]).range([25, 400]);
    var svg = d3.select('#vision').append('svg').attr('class', "".concat(targetSVG, " hidden")).attr('viewBox', "0 10 650 100").attr('preserveAspectRatio', 'xMinYMin meet');
    var xAxis = d3.axisBottom().scale(xScale).tickSize(0).tickFormat(function (d) {
      return Object.keys(movieData).slice(3)[d];
    });
    var formatValue = d3.format('.1s');
    var yAxis = d3.axisLeft(yScale).ticks(4).tickFormat(function (tickCount) {
      switch (tickCount) {
        case 10:
          return '1 billion';
          break;

        case 0:
          return '1 million';

        default:
          return formatValue(tickCount) + '00 million';
      }
    });
    svg.append('g').attr('class', "".concat(targetSVG, "-x-axis x-axis")).attr('transform', 'translate(' + margin.left + ', ' + (height - margin.top) + ')').transition().duration(3000).call(xAxis);
    svg.selectAll('.x-axis text').attr('transform', function (d) {
      return 'translate(14, 35)rotate(-40)';
    });
    svg.selectAll('.x-axis text').attr('text-decoration', function (d) {
      return 'underline';
    });
    svg.append('text').text('Source: IMDbPro').attr('class', 'movie-source').attr('transform', 'translate(35, ' + (height + margin.top + 75) + ')').attr('font-size', '13px').style('text-anchor', 'right');
    svg.append('g').attr('class', "".concat(targetSVG, "-y-axis y-axis")).attr('transform', 'translate(' + margin.left + ',0)').style('opacity', '0%').call(yAxis);
    svg.selectAll('rect').data(data).enter().append('rect').attr('class', "".concat(targetSlideRect)).attr('x', function (d, i) {
      return i * (x_axisLength / numberOfColumns) + margin.left + 20;
    }).attr('y', function (d) {
      return yScale(d / 100);
    }).attr('width', x_axisLength / numberOfColumns - 1).attr('height', function (d) {
      return height - yScale(d / 100) - margin.top;
    }).transition().duration(1000);
    var defs = svg.append('defs');
    var gradient = defs.append('linearGradient').attr('id', 'svgGradient').attr('x1', '0%').attr('x2', '100%').attr('y1', '0%').attr('y2', '100%');
    gradient.append('stop').attr('class', 'start').attr('offset', '0%').attr('stop-color', 'rgb(214,183,33)').attr('stop-opacity', 2);
    gradient.append('stop').attr('class', 'end').attr('offset', '100%').attr('stop-color', 'rgb(31,131,51)').attr('stop-opacity', 2);
  }; // })


  var createObs = function createObs(containers) {
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    for (var i = 0; i < containers.length - 1; i++) {
      renderSlide(options, containers[i], i);
    }
  };

  window.addEventListener('load', function (e) {
    var obsContainers = [];

    for (var i = 0; i <= movieData.length; i++) {
      var movContainer = '#movie-container-' + i;
      var movSlide = document.querySelector(movContainer);
      obsContainers.push(movSlide);
    }

    createObs(obsContainers);
  }, false);

  var appendNavLi = function appendNavLi(idx) {
    var navCol = document.querySelector('.viz-nav');
    var ankLi = document.createElement('a');
    var navLi = document.createElement('li');
    ankLi.setAttribute('href', "#anchor-".concat(idx));
    navCol.appendChild(ankLi);
    navLi.setAttribute('id', "viz-nav-li-".concat(idx));
    navLi.classList.add('viz-nav-li');
    ankLi.appendChild(navLi);
  };

  var appendAnchor = function appendAnchor(idx) {
    var movieContainer = document.getElementById("movie-container-".concat(idx));
    var aTag = document.createElement('a');
    aTag.setAttribute('id', "anchor-".concat(idx));
    aTag.classList.add('anchor');
    movieContainer.appendChild(aTag);
  };

  var renderSlide = function renderSlide(options, slide, idx) {
    var handleScroll = function handleScroll(entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelector(".slide-svg-".concat(idx)).classList.remove('hidden');

          if (document.querySelector(".slide-svg-".concat(idx - 1))) {
            document.querySelector(".slide-svg-".concat(idx - 1)).classList.add('hidden');
          }

          if (document.querySelector(".slide-svg-".concat(idx + 1))) {
            document.querySelector(".slide-svg-".concat(idx + 1)).classList.add('hidden');
          }

          document.querySelectorAll(".slide-svg-".concat(idx, "-rect")).forEach(function (rect) {
            rect.classList.add('bar-rect');
          });
          d3.select(".slide-svg-".concat(idx, "-y-axis")).transition().style('opacity', '100%').duration(500);
          var navCircle = document.getElementById("viz-nav-li-".concat(idx));
          navCircle.classList.add("viz-nav-li-".concat(idx));

          if (document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect"))) {
            document.querySelectorAll(".slide-svg-".concat(idx - 1, "-rect")).forEach(function (rect) {
              rect.classList.remove('bar-rect');
            });
            d3.select(".slide-svg-".concat(idx - 1, "-y-axis")).transition().style('opacity', '0%').duration(1000);
          }

          if (document.getElementById("viz-nav-li-".concat(idx - 1))) {
            document.getElementById("viz-nav-li-".concat(idx - 1)).classList.remove("viz-nav-li-".concat(idx - 1));
          }

          if (document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect"))) {
            document.querySelectorAll(".slide-svg-".concat(idx + 1, "-rect")).forEach(function (rect) {
              rect.classList.remove('bar-rect');
            });
            d3.select(".slide-svg-".concat(idx + 1, "-y-axis")).transition().style('opacity', '0%').duration(1000);
            document.getElementById("viz-nav-li-".concat(idx + 1)).classList.remove("viz-nav-li-".concat(idx + 1));
          }
        }
      });
    };

    var observer = new IntersectionObserver(handleScroll, options);
    observer.observe(slide);
  };
});
/******/ })()
;
//# sourceMappingURL=main.js.map