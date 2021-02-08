import * as pitchFrame from './pitchFrame';
import * as Pitch from './pitch';

export const create = (id) => {

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, pitchFrame.width]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([pitchFrame.height, 0]);

    var pitch = Pitch.create();

    var voronoi = d3.voronoi().extent([[0, 0], [pitchFrame.width, pitchFrame.height]]);

    d3.csv('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/goal.csv', (data) => {
        data.forEach(function(d) {
            d.x = Math.round(+d.x*100);
            d.y = Math.round(+d.y*100);
        });
        console.log(data);
        pitch
            .selectAll('.player')
            .data(data.filter( (d) => d.marker == 'H' ))
            .enter()
            .append('circle')
            .attr('cx', (d) => {return x(100-d.y)})
            .attr('cy', (d) => {return y(d.x)})
            .attr("r", 8)
            .attr('fill', (d) => d.marker == 'H' ? 'blue' : 'red' )
        
        var vertices = data
            .filter((d) => d.marker == 'H')
            .map( (d) => { return [x( 100 - d.y), y( d.x )] });
    
        pitch
            .selectAll(".player")
            .data( voronoi.polygons(vertices)  )
            .enter()
            .append("path")
            .attr("stroke","blue")
            .attr('stroke-opacity', '0.3')
            .style("stroke-dasharray", ("8")) 
            .attr("fill", 'transparent')
            .attr("d", polygon);
        
        function polygon(d) { 
            return d ? "M" + d.join("L") + "Z": null; 
        };
    })
};