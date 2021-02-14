import * as event from './js/eventFrame';

let state = {"updatedAt": new Date};
window.state = state;

const clear = (div) => {
    document.querySelector(`${div}`).innerHTML = '';
};


///////////////////////////////////////////////
// FRAME Controller
///////////////////////////////////////////////
const frameController = async () => {
    clear('.pitchContainer');
    event.create('100798');
}

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', async () => {
    await frameController();
});

window.addEventListener('hashchange', async () => {
    await frameController();
});