import { makeDOMwithProperties, appendChildList } from '../dom.js';

const StarRating = ($container) => {
  const maxRating = $container.dataset.maxRating || 5;

  const handleRatingEvent = (event) => {
    const $starContainer = event.target.closest('.star-rating-container');
    const $stars = [...$starContainer.querySelectorAll('i')];
    const $target = event.target;
    const targetIndex = $stars.indexOf($target);

    if (event.type === 'click') {
      const rating = targetIndex + 1;
      const eventRatingChange = new CustomEvent('rating-change', {
        detail: rating,
      });
      $container.dispatchEvent(eventRatingChange);

      $stars.forEach(($star, index) => {
        if (index <= targetIndex) {
          $star.classList.toggle('selected', true);
        } else {
          $star.classList.toggle('selected', false);
        }
      });
    } else if (event.type === 'mouseover') {
      $stars.forEach(($star, index) => {
        if (index <= targetIndex) {
          $star.classList.add('hovered');
        } else {
          $star.classList.remove('hovered');
        }
      });
    } else if (event.type === 'mouseleave') {
      $stars.forEach(($star) => {
        $star.classList.remove('hovered');
      });
    }
  };

  const setRatingLayout = () => {
    const $starContainer = makeDOMwithProperties('span', {
      className: 'star-rating-container',
    });

    const $stars = [...new Array(parseInt(maxRating))].map((_, index) => {
      const $star = makeDOMwithProperties('i', {
        className: 'bx bxs-star',
      });

      $star.addEventListener('mouseleave', handleRatingEvent);
      $star.addEventListener('mouseover', handleRatingEvent);
      $star.addEventListener('click', handleRatingEvent);
      return $star;
    });

    appendChildList($starContainer, $stars);
    appendChildList($container, [$starContainer]);
  };

  const init = () => {
    setRatingLayout();
  };

  init();
};

export default StarRating;
