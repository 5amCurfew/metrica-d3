import * as event from './js/event';

let state = {"updatedAt": new Date};
window.state = state;

const clear = (div) => {
    document.querySelector(`${div}`).innerHTML = '';
};


///////////////////////////////////////////////
// FRAME Controller
///////////////////////////////////////////////
const frameController = async () => {
    clear('#pitch');
    event.create();
}

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', async () => {
        frameController();
});

window.addEventListener('hashchange', () => {
    frameController();
});