import * as pitchBoundaries from './pitchBoundaries';
//import * as Pitch from './pitch';
import * as axios from 'axios';

export const create = async (id) => {

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, pitchBoundaries.width]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([pitchBoundaries.height, 0]);

    var pitch = d3.select('svg');

    var voronoi = d3.voronoi().extent([[0, 0], [pitchBoundaries.width, pitchBoundaries.height]]);

    /////////////////////////////
    // EVENT
    /////////////////////////////
    d3.json('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/event_example.json', (event) => {
        event.forEach( (e) => {
            e.x_scaled = Math.round(e.x*100);
            e.y_scaled = Math.round(e.y*100);
            e.xEnd_scaled = Math.round(e.xEnd*100);
            e.yEnd_scaled = Math.round(e.yEnd*100);
        })

        pitch
            .append('g')
            .attr('class', 'eventSegment')
            .data(event)
            .append('line')
                .attr('x1', (e) => x(100 - e.y_scaled))
                .attr('y1', (e) => y(e.x_scaled))
                .attr('x2', (e) => x(100 - e.yEnd_scaled))
                .attr('y2', (e) => y(e.xEnd_scaled))
                .attr('stroke', '#000')

        pitch
            .append('g')
            .attr('class', 'eventMarker')
            .data(event)
            .append('circle')
                .attr('cx', (e) => {return x(100-e.yEnd_scaled)})
                .attr('cy', (e) => {return y(e.xEnd_scaled)})
                .attr("r", 4)
                .attr('fill', 'white')
                .attr('stroke', 'black')
    })
    

    /////////////////////////////
    // FRAME
    /////////////////////////////
    const config = {
        method: 'get',
        url: `http://localhost:4040/track/${id}`
    };
    const track = (await axios(config)).data;
    track.forEach(function(d) {
        d.x = Math.round(+d.x*100);
        d.y = Math.round(+d.y*100);
    });

    pitch
        .append('g')
        .attr('class', 'markers')
            .selectAll('.player')
            .data(track)
            .enter()
            .append('circle')
                .attr('cx', (d) => {return x(100-d.y)})
                .attr('cy', (d) => {return y(d.x)})
                .attr("r", 8)
                .attr('fill', (d) => d.marker == 'H' ? 'blue' : 'red' )
    
    var vertices = track
        .map( (d) => { return [x( 100 - d.y), y( d.x )] });

    pitch
        .append('g')
        .attr('class', 'voronoi')
            .selectAll(".voronoi_segment")
            .data( voronoi.polygons(vertices)  )
            .enter()
            .append("path")
                .attr("stroke","grey")
                .attr('stroke-opacity', '0.3')
                .style("stroke-dasharray", ("8")) 
                .attr("fill", 'transparent')
                .attr('transform', 'translate(' + pitchBoundaries.margin.left + ',' + pitchBoundaries.margin.top + ')')
                .attr("d", polygon);
    
    function polygon(d) { 
        return d ? "M" + d.join("L") + "Z": null; 
    };

};