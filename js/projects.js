
var parseDate = d3.timeParse('%d-%m-%Y');

function sortByDateDescending(a, b) {
  // Dates will be cast to numbers automagically:
  return b.date - a.date;
}

d3.json('data/projects.json').then(function (data) {
  // Parsing dates
  data.forEach(function (d) {
    d.date = parseDate(d.date);
  });

  data = data.sort(sortByDateDescending);

  const cards = d3.select('#cards')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'col-sm-12 col-md-6 col-lg-5 mb-5 mx-4')
    .attr('onclick', d => 'window.open("' + d.url + '")')
    .style('display', d => d.isPublic ? 'inherit' : 'none')
    .append('div')
    .attr('class', d => 'card card-' + d.category);

  cards
    .append('img')
    .attr('class', 'card-img-top')
    .attr('src', d => d.cover)
    .attr('alt', d => d.title)

  const cardBodies = cards
    .append('div')
    .attr('class', 'card-body')

  cardBodies
    .append('h5')
    .attr('class', 'card-title')
    .text(d => d.title + ' (' + d.date.getFullYear() + ')')
    
  cardBodies
    .append('div')
    .attr('class', 'card-text')
    .text(d => d.description)

  cards
    .append('div')
    .attr('class', 'card-footer')
    .text(d => d.skills)

});
