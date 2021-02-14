import * as pitchBoundaries from './pitchBoundaries';
export const create = (location) => {

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, pitchBoundaries.width]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([pitchBoundaries.height, 0]);

    var svg = d3.select(location)
        .append('svg')
        .attr("viewBox", `0 0 ${pitchBoundaries.width + pitchBoundaries.margin.left + pitchBoundaries.margin.right} ${pitchBoundaries.height + pitchBoundaries.margin.top + pitchBoundaries.margin.bottom}`)
        .append('g')
        .attr('class', 'pitch')
        .attr('transform', 'translate(' + pitchBoundaries.margin.left + ',' + pitchBoundaries.margin.top + ')');

    svg
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('class', 'mesh')
        .attr('width', pitchBoundaries.width)
        .attr('height', pitchBoundaries.height);

    // field outline    
    svg
        .append('rect')
        .attr('id','outline')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', pitchBoundaries.width)
        .attr('height', pitchBoundaries.height)
        .attr('fill', 'none')
        .attr('stroke', 'black'); 

    // right penalty area 
    //svg.append('rect')
    //    .attr('id','six')
    //    .attr('x', x(83))
    //    .attr('y', y(78.9))
    //    .attr('width', x(100) - x(83))
    //    .attr('height', y(21.1) - y(78.9))
    //    .attr('fill', 'none')
    //    .attr('stroke', 'black');

    // bottom penalty area
    svg
        .append('rect')
        .attr('id','six')
        .attr('x', x(21.1))
        .attr('y', y(100-83))
        .attr('width', -(x(21.1) - x(78.9)))
        .attr('height',  -(y(100) - y(83)))
        .attr('fill', 'none')
        .attr('stroke', 'black');

    //// right six yard box
    //svg.append('rect')
    //    .attr('id','penarea')
    //    .attr('x', x(94.2))
    //    .attr('y', y(63.2))
    //    .attr('width', x(100) - x(94.2))
    //    .attr('height', y(36.8) - y(63.2))
    //    .attr('fill', 'none')
    //    .attr('stroke', 'black');
    
    // bottom six yard box
    svg
        .append('rect')
        .attr('id','penarea')
        .attr('x', x(36.8))
        .attr('y', y(100-94.2))
        .attr('width', -(x(36.8) - x(63.2)))
        .attr('height', -(y(100) - y(94.2)))
        .attr('fill', 'none')
        .attr('stroke', 'black');

    //// right goal
	//svg.append('rect')
	//	.attr('id','penarea')
	//	.attr('x', x(100))
	//	.attr('y', y(54.8))
	//	.attr('width', pitchBoundaries.margin.right - 1)
	//	.attr('height', y(45.2) - y(54.8))
	//	.attr('fill', 'none')
	//	.attr('stroke', 'black');   
    
    // bottom goal
	svg
        .append('rect')
		.attr('id','penarea')
		.attr('x', x(100-54.8))
		.attr('y', y(0))
		.attr('width', -(x(45.2) - x(54.8)))
		.attr('height', pitchBoundaries.margin.bottom)
		.attr('fill', 'none')
        .attr('stroke', 'black');
        
    //// left penalty area 
	//svg.append('rect')
	//   .attr('id','six')
	//   .attr('x', x(0))
	//   .attr('y', y(78.9))
	//   .attr('width', x(100) - x(83))
	//   .attr('height', y(21.1) - y(78.9))
	//   .attr('fill', 'none')
    //   .attr('stroke', 'black');
    
    // top penalty area 
    svg
        .append('rect')
        .attr('id','six')
        .attr('x', x(100-78.9))
        .attr('y', y(100))
        .attr('width', -(x(21.1) - x(78.9)))
        .attr('height',  -(y(100) - y(83)))
        .attr('fill', 'none')
        .attr('stroke', 'black');

    //// left six yard box
	//svg.append('rect')
	//	.attr('id','penarea')
	//	.attr('x', x(0))
	//	.attr('y', y(63.2))
	//	.attr('width', x(100) - x(94.2))
	//	.attr('height', y(36.8) - y(63.2))
	//	.attr('fill', 'none')
    //    .attr('stroke', 'black');

    // top six yard box
	svg
        .append('rect')
		.attr('id','penarea')
		.attr('x', x(100-63.2))
		.attr('y', y(100))
		.attr('width',  -(x(36.8) - x(63.2)))
		.attr('height', -(y(100) - y(94.2)))
		.attr('fill', 'none')
		.attr('stroke', 'black');

    //// left goal
	//svg.append('rect')
	//	.attr('id','penarea')
	//	.attr('x', x(0) - pitchBoundaries.margin.right + 1)
	//	.attr('y', y(54.8))
	//	.attr('width', pitchBoundaries.margin.right - 1)
	//	.attr('height', y(45.2) - y(54.8))
	//	.attr('fill', 'none')
    //    .attr('stroke', 'black');
    
    // top goal
	svg
        .append('rect')
		.attr('id','penarea')
		.attr('x', x(100-54.8))
		.attr('y', y(100) - pitchBoundaries.margin.right)
		.attr('width', -(x(45.2) - x(54.8)))
		.attr('height', pitchBoundaries.margin.top)
		.attr('fill', 'none')
        .attr('stroke', 'black');
        
    //// 50 yd line (H)
	//svg.append('line')
	//	.attr('id','half')
	//	.attr('x1', x(50))
	//	.attr('x2', x(50))
	//	.attr('y1', y(0))
	//	.attr('y2', y(100))
    //    .attr('stroke', 'black'); 

    // 50 yd line (V)
	 svg
        .append('line')
        .attr('id','half')
        .attr('x1', x(0))
        .attr('x2', x(100))
        .attr('y1', y(50))
        .attr('y2', y(50))
        .attr('stroke', 'black'); 
        
    // center circle
	svg
        .append('circle')
	    .attr('cx', x(50))
	    .attr('cy', y(50))
	    .attr('r', x(10))
	    .attr('fill', 'none')
        .attr('stroke', 'black');

    // center point
	svg
        .append('circle')
	    .attr('cx', x(50))
	    .attr('cy', y(50))
	    .attr('r', x(.5))
	    .attr('fill', 'black')
        .attr('stroke', 'black');

    // penalty spot top
	svg
        .append('circle')
        .attr('cx', x(50))
        .attr('cy', y(12))
        .attr('r', x(.5))
        .attr('fill', 'black')
        .attr('stroke', 'black');
    // penalty spot top
	svg
        .append('circle')
        .attr('cx', x(50))
        .attr('cy', y(88))
        .attr('r', x(.5))
        .attr('fill', 'black')
        .attr('stroke', 'black');

    var arc1 = d3.arc()
        .innerRadius(90)
        .outerRadius(91)
        .startAngle(125 * (Math.PI/180)) //converting from degs to radians
        .endAngle(235 * (Math.PI/180)); //just radians
    svg.append("path")
        .style("stroke-width", 1)
        .attr("d", arc1)
        .attr("transform", "translate(285,75)");

    var arc2 = d3.arc()
        .innerRadius(90)
        .outerRadius(91)
        .startAngle(306.5 * (Math.PI/180)) //converting from degs to radians
        .endAngle(360 * (Math.PI/180)); //just radians
    var arc2A = d3.arc()
        .innerRadius(90)
        .outerRadius(91)
        .startAngle(0 * (Math.PI/180)) //converting from degs to radians
        .endAngle(53 * (Math.PI/180)); //just radians
    svg.append("path")
        .style("stroke-width", 1)
        .attr("d", arc2)
        .attr("transform", "translate(285,675)");
    svg.append("path")
        .style("stroke-width", 1)
        .attr("d", arc2A)
        .attr("transform", "translate(285,675)");

    //// V Line split
    //svg.append('line')
    //    .attr('x1', x(50))
    //    .attr('x2', x(50))
    //    .attr('y1', y(0))
    //    .attr('y2', y(100))
    //    .attr('stroke', 'grey')
    //    .style("stroke-dasharray", ("5")); 

    return svg;

}