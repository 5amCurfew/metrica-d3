import * as pitchFrame from './pitchFrame';
import * as Pitch from './pitch';

export const create = (id) => {

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, pitchFrame.width]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([pitchFrame.height, 0]);

    const pitch = Pitch.create();

    d3.csv('https://raw.githubusercontent.com/5amCurfew/metrica-d3/main/src/data/goal.csv', (data) => {
        const event = data;
        console.log(event);
        pitch
            .data(event)
            .enter()
            .append('circle')
            .attr('x', (d) => {return x(+d.y*100)})
            .attr('y', (d) => {return y(+d.x*100)})
            .attr('fill', 'black')
    })

};