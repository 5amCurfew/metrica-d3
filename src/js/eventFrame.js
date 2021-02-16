import * as pitchBoundaries from './pitchBoundaries';
import * as axios from 'axios';

export const create = async (event) => {

    console.log(event);

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
            .attr('x2', (e) => e.type == 'PASS' || e.type == 'SHOT' ? x(100 - e.yEnd_scaled) : 0)
            .attr('y2', (e) => e.type == 'PASS' || e.type == 'SHOT' ? y(e.xEnd_scaled) : 0)
            .attr('transform', 'translate(' + pitchBoundaries.margin.left + ',' + pitchBoundaries.margin.top + ')')
            .attr('stroke', (e) => e.type == 'PASS' || e.type == 'SHOT' ? '#000' : 'transparent')
    
    pitch
        .append('g')
        .attr('class', 'eventMarker')
        .data(event)
        .append('circle')
            .attr('cx', (e) => e.type == 'PASS' || e.type == 'SHOT' ? x(100-e.yEnd_scaled) : x(100-e.y_scaled))
            .attr('cy', (e) => e.type == 'PASS' || e.type == 'SHOT' ? y(e.xEnd_scaled) : y(e.x_scaled))
            .attr("r", (e) => e.type == 'PASS' || e.type == 'SHOT' ? 4 : 12)
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .attr('transform', 'translate(' + pitchBoundaries.margin.left + ',' + pitchBoundaries.margin.top + ')')
    

    /////////////////////////////
    // FRAME
    /////////////////////////////
    const config = {
        method: 'get',
        url: `http://localhost:4040/track/${event[0].start_frame}`
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
                .attr("r", 7)
                .attr('fill', (d) => d.marker == 'H' ? 'blue' : d.marker == 'A' ? 'red' : 'transparent' )
                .attr('fill-opacity', '0.5')
                .attr('transform', 'translate(' + pitchBoundaries.margin.left + ',' + pitchBoundaries.margin.top + ')')
    
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