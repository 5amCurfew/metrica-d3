import * as event from './js/eventFrame';
import * as Pitch from './js/pitch';

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
    event.create('100798');
}

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', async () => {
    Pitch.create('.pitchContainer');
});

window.addEventListener('hashchange', async () => {
    await frameController();
});