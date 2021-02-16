const formatTime = (seconds) => {
  const time = new Date(seconds * 1000).toISOString().substr(11, 8)
  const m = parseFloat(time.split(':')[0]*60) + parseFloat(time.split(':')[1])
  const s = parseFloat(time.split(':')[2]) < 10 ? time.split(':')[2] : parseFloat(time.split(':')[2])
  return [m, s].join(':')
}

export const create = async (events) => {

    events.forEach((e, index) => {
      let emoji;
      if (e.type == 'PASS') {
        emoji = '&#8594;'
      } else if (e.type == 'SHOT') {
        emoji = '&#x26bd'
      } else if (e.type == 'CHALLENGE'){
        emoji = '&#11093'
      } else if(e.type == 'RECOVERY'){
        emoji = '&#8853;'
      }

      const markup = `
      <a  href="#${e.start_frame}">
          <div class="eventCard">
            <div class="eventTime">&#128338; ${formatTime(e.start_time)}</div>
            <div class="eventInfo fade_in">
                    <p class="eventSymbol">${emoji}</p>
                    <p class="eventType">${e.type}: ${e.sub_type}</p>
                    <p class="eventTeam">team: ${e.team}</p>
            </div>
          </div>
        </a>`;
      document.querySelector('.menuContainer').insertAdjacentHTML('beforeend', markup);
    });
  };