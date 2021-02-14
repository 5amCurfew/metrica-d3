export const create = async () => {

    const config = {
        method: 'get',
        url: `http://localhost:4040/events`
    };
    const events = (await axios(config)).data;
    events = events.sort( (e1, e2) => e1.time<e2.time )
    events.forEach((event, index) => {

      if (activity.type == 'Ride') {
        figSrc = 'img/bicycle.png';
      } else if (activity.type == 'Swim') {
        figSrc = 'img/swim.png';
      } else {
        figSrc = 'img/run.png';
      }

      const markup = `
          <li class="results__obj" style="--d:${0.2 * index}s">
            <a class="results__link results__link--active" href="#${activity.id}">
                <figure class="results__fig fade_in">
                    <img src="${figSrc}" alt="Test">
                </figure>
                <div class="results__data fade_in">
                    <h4 class="results__name">${activity.title.replace(/->/g, '&rarr;')}</h4>
                    <p class="results__km">${Math.round(activity.distance / 1000)}km</p>
                    <p class="results__km">${time} on ${date}</p>
                </div>  
            </a>
          </li>`;
  
      document.querySelector('.menuContainer').insertAdjacentHTML('beforeend', markup);
    });
  };