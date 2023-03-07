import { makeDOMwithProperties, appendChildList } from './dom.js';

const AnalogClock = ($container) => {
  const CLOCK_HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const setClockLayout = () => {
    const $hourHand = makeDOMwithProperties('div', {
      className: 'hand hour',
    });
    const $minuteHand = makeDOMwithProperties('div', {
      className: 'hand minute',
    });
    const $secondHand = makeDOMwithProperties('div', {
      className: 'hand second ',
    });

    appendChildList($container, [$hourHand, $minuteHand, $secondHand]);

    for (let i = 1; i <= CLOCK_HOURS.length; i++) {
      const $hour = makeDOMwithProperties('div', {
        className: `time time${i}`,
        innerHTML: '|',
      });
      appendChildList($container, [$hour]);
    }
  };

  const setClockHand = () => {
    const $hourHand = $container.querySelector('.hour');
    const $minuteHand = $container.querySelector('.minute');
    const $secondHand = $container.querySelector('.second');

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDegree = hours * 30 + minutes * 0.5 + seconds * (0.5 / 60);
    const minuteDegree = minutes * 6;
    const secondDegree = seconds * 6;

    $hourHand.style.setProperty('--deg', hourDegree);
    $minuteHand.style.setProperty('--deg', minuteDegree);
    $secondHand.style.setProperty('--deg', secondDegree);
  };

  const init = () => {
    setClockLayout();

    setInterval(setClockHand, 1000);
  };

  document.addEventListener('DOMContentLoaded', init);
};

export default AnalogClock;
