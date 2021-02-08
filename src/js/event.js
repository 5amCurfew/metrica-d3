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

    d3.csv('', (data) => {
        const event = data
        console.log(event);
    })

};