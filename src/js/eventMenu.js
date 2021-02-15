export const create = async (events) => {

    events.forEach((e, index) => {

      if (e.type == 'PASS') {
        // set pass
      } else if (e.type == 'SHOT') {
        // set shot
      }

      const markup = `
          <li class="results__obj" style="--d:${0.2 * index}s">
            <a class="results__link results__link--active" href="#${e.start_frame}">
                <div class="results__data fade_in">
                    <h4 class="results__name">${e.type.replace(/->/g, '&rarr;')}</h4>
                    <p class="results__km">${e.sub_type}km</p>
                    <p class="results__km">${e.team}</p>
                </div>  
            </a>
          </li>`;
  
      document.querySelector('.menuContainer').insertAdjacentHTML('beforeend', markup);
    });
  };