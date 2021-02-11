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

    d3.json('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/event_example.json', (event) => {

        event.x_scaled = Math.round(event.x*100);
        event.y_scaled = Math.round(event.y*100);
        event.xEnd_scaled = Math.round(event.xEnd*100);
        event.yEnd_scaled = Math.round(event.yEnd*100);

        console.log(event);
        pitch
            .data(event)
            .append('line')
                .attr('x1', (e) => x(100 - e.y_scaled))
                .attr('y1', (e) => y(e.x_scaled))
                .attr('x2', (e) => x(100 - e.yEnd_scaled))
                .attr('y2', (e) => y(e.xEnd_scaled))
                .attr('stroke', '#000')

        pitch
            .data(event)
            .append('circle')
            .attr('cx', (d) => {return x(100-d.yEnd_scaled)})
            .attr('cy', (d) => {return y(d.xEnd_scaled)})
            .attr("r", 4)
            .attr('fill', 'white')
            .attr('stroke', 'black')
    })
    
    d3.json('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/track_example.json', (data) => {
        data.forEach(function(d) {
            d.x = Math.round(+d.x*100);
            d.y = Math.round(+d.y*100);
        });
        pitch
            .selectAll('.player')
            .data(data)
            .enter()
            .append('circle')
                .attr('cx', (d) => {return x(100-d.y)})
                .attr('cy', (d) => {return y(d.x)})
                .attr("r", 8)
                .attr('fill', (d) => d.marker == 'H' ? 'blue' : 'red' )
        
        var vertices = data
            .map( (d) => { return [x( 100 - d.y), y( d.x )] });
    
        pitch
            .selectAll(".player")
            .data( voronoi.polygons(vertices)  )
            .enter()
            .append("path")
                .attr("stroke","grey")
                .attr('stroke-opacity', '0.3')
                .style("stroke-dasharray", ("8")) 
                .attr("fill", 'transparent')
                .attr("d", polygon);
        
        function polygon(d) { 
            return d ? "M" + d.join("L") + "Z": null; 
        };
    })

};