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

    d3.csv('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/event.csv', (data) => {
        data.forEach((e) => {
            e.x = Math.round(+e["Start X"]*100);
            e.y = Math.round(+e["Start Y"]*100);
            e.xEnd = Math.round(+e["End X"]*100);
            e.yEnd = Math.round(+e["End Y"]*100);
        })
        console.log(data.filter( (d) => d["Start Frame"] == 90005 ))
        
        const event = data.filter( (d) => d["Start Frame"] == 90005 );
        pitch
            .data(event)
            .append('line')
                .attr('x1', (e) => x(100 - e.y))
                .attr('y1', (e) => y(e.x))
                .attr('x2', (e) => x(100 - e.yEnd))
                .attr('y2', (e) => y(e.xEnd))
                .attr('stroke', '#000')
                .attr("marker-end","url(#arrow)");

        pitch
            .data(event)
            .append('circle')
            .attr('cx', (d) => {return x(100-d.yEnd)})
            .attr('cy', (d) => {return y(d.xEnd)})
            .attr("r", 4)
            .attr('fill', 'white')
            .attr('stroke', 'black')
    })
    
    d3.json('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/track_example.json', (data) => {
        data.forEach(function(d) {
            d.x = Math.round(+d.x*100);
            d.y = Math.round(+d.y*100);
        });
        console.log(data);
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