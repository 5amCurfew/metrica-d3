import * as event from './js/eventFrame';
import * as Pitch from './js/pitch';
import * as eventMenu from './js/eventMenu';
import * as axios from 'axios';

let state = {"updatedAt": new Date};
window.state = state;

const clear = async (div) => {
    div.forEach( (divClass) => {
        document.querySelectorAll(`${divClass}`) ? document.querySelectorAll(`${divClass}`).forEach(e => e.remove()) : console.log('---')
    }) 
};

///////////////////////////////////////////////
// FRAME Controller
///////////////////////////////////////////////
const frameController = async () => {
    await clear( ['.eventMarker', '.eventSegment', '.markers', '.voronoi'] );
    var id = +location.hash.replace('#', '');
    const e = state.events.filter( (e) => e.start_frame == id );
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
    state.events = (await axios(config)).data.filter((e) => e.type != 'SET PIECE');
    eventMenu.create(state.events);
});

window.addEventListener('hashchange', async () => {
    await frameController();
});