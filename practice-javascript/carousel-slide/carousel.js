(function () {
  "use strict";

  // querySelectorAll 메서드를 사용하여 단일 / 복수 요소를 선택하는 유틸 함수
  const get = (target) => {
    const els = document.querySelectorAll(target);
    return els.length > 1 ? els : els[0];
  };

  const $slideContainer = get(".slider__wrapper");
  const $slider = get(".slider");

  const $slideIndicator = get(".slide-count");
  const $totalSlides = get(".all-slide");
  const $currentSlide = get(".current-slide");
  const $prevBtn = get(".control__button.prev");
  const $nextBtn = get(".control__button.next");
  const $slide = get(".slide");

  const slideWidth = $slide[0].clientWidth;
  const slideAmount = $slide.length;
  const sliderWidth = slideWidth * slideAmount;
  const slideSpeed = 1000;

  let currentIndex = 1;
  let moveOffset = 0;

  let interval;

  // 현재 슬라이드 인덱스를 기준으로 슬라이더 구성요소에 대한 접근성 속성을 설정
  const setAccessibility = () => {
    for (let i = 0; i < $slider.children.length; i++) {
      if (i === currentIndex) {
        $slider.children[i].setAttribute("aria-hidden", false);
      } else {
        $slider.children[i].setAttribute("aria-hidden", true);
      }
    }

    // slide-count에 aria-label 속성을 추가하고 현재 슬라이드의 인덱스를 추가한다.
    setTimeout(() => {
      $slideIndicator.setAttribute("aria-label", `slide ${$currentSlide.textContent} of ${slideAmount}`);
    }, 100);
    
  };

  // 자동 재생 함수
  const slideAutoPlay = () => {
    interval = setInterval(() => {
      handleSwipe(1);

      if (currentIndex === $slider.children.length - 1) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = 1;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    }, 3000);
  };

  /**
   * direction
   * next : 1, prev : -1
   *
   * handleSwipe는 이전, 다음 버튼을 클릭하거나 자동으로 슬라이드가 넘어갈 때 실행되는 함수로
   * 같은 함수에서 이전, 다음 버튼을 클릭했을 때의 이벤트를 구분하기 위해
   * direction을 사용한다.
   */
  const handleSwipe = (direction) => {
    currentIndex = currentIndex + direction;

    if (currentIndex >= slideAmount + 2) {
      currentIndex = 4;
    } else if (currentIndex <= 0) {
      currentIndex = 0;
    }

    moveOffset = (100 / slideAmount) * currentIndex;

    if (currentIndex <= 0) {
      $currentSlide.textContent =
        $slider.children[$slider.children.length - 2].dataset.index;
    } else if (currentIndex >= $slider.children.length - 1) {
      $currentSlide.textContent = $slider.children[1].dataset.index;
    } else {
      $currentSlide.textContent = $slider.children[currentIndex].dataset.index;
    }

    $slider.style.transform = `translateX(-${moveOffset}%)`;
    $slider.style.transition = `all ${slideSpeed}ms ease`;

    setAccessibility();
  };

  // 이전, 다음 버튼 클릭 이벤트 핸들러
  const handleMoveBtn = (event) => {
    event.preventDefault();
    const $target = event.currentTarget;

    if ($target.id === "nextBtn") {
      handleSwipe(1);

      if (currentIndex === $slider.children.length - 1) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = 1;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    } else {
      handleSwipe(-1);

      if (currentIndex === 0) {
        setTimeout(() => {
          $slider.style.transition = "none";
          currentIndex = $slider.children.length - 2;
          moveOffset = (100 / slideAmount) * currentIndex;
          $slider.style.transform = `translateX(-${moveOffset}%)`;
        }, slideSpeed);
      }
    }
  };

  // 레아아웃 셋업
  const setSlideLayout = () => {
    // 무한 슬라이드를 위해 첫번째 슬라이드와 마지막 슬라이드를 복제
    const $firstSlideClone = $slider.firstElementChild.cloneNode(true);
    const $lastSlideClone = $slider.lastElementChild.cloneNode(true);

    $slider.insertBefore($lastSlideClone, $slider.firstElementChild);
    $slider.appendChild($firstSlideClone);

    // 슬라이드의 너비를 설정하고, 1번째 슬라이드로 위치 초기화 (translateX)
    $slider.style.width = `${sliderWidth}px`;
    $slider.style.transform = `translateX(-${slideWidth}px)`;

    setAccessibility();
  };

  const handleMouseEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearInterval(interval);
  };

  const handleMouseLeave = (e) => {
    slideAutoPlay();
  };

  // 사용자가 이전, 다음 버튼을 클릭할 때, 1초에 한번씩만 실행되도록 throttle 함수를 사용
  const throttle = (fn, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      fn(...args);
    };
  };

  const handleMoveBtnThrottled = throttle(handleMoveBtn, 1000);

  const init = () => {
    setSlideLayout();
    slideAutoPlay();

    $totalSlides.textContent = slideAmount;
    $currentSlide.textContent = currentIndex;

    $prevBtn.addEventListener("click", handleMoveBtnThrottled);
    $nextBtn.addEventListener("click", handleMoveBtnThrottled);

    $slideContainer.addEventListener("mouseenter", handleMouseEnter);
    $slideContainer.addEventListener("mouseleave", handleMouseLeave);
  };

  window.addEventListener("DOMContentLoaded", init);
})();
