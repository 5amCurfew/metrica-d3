import * as event from './js/eventFrame';
import * as Pitch from './js/pitch';
import * as axios from 'axios';

let state = {"updatedAt": new Date};
window.state = state;

const clear = (div) => {
    div.forEach( (divClass) => {
        document.querySelectorAll(`${divClass}`) ? document.querySelectorAll(`${divClass}`).forEach(e => e.remove()) : console.log('---')
    }) 
};

///////////////////////////////////////////////
// FRAME Controller
///////////////////////////////////////////////
const frameController = async () => {
    clear( ['.eventMarker', '.eventSegment', '.marker', '.voronoi'] );
    const e = state.events.filter( (e) => e.start_frame == 90005 );
    event.create(e);
}

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', async () => {
    Pitch.create('.pitchContainer');
    const config = {
        method: 'get',
        url: `http://localhost:4040/events/`
    };
    state.events = (await axios(config)).data;
});

window.addEventListener('hashchange', async () => {
    await frameController();
});