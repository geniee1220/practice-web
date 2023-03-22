(function () {
  'use strict';

  const get = (target) => {
    const els = document.querySelectorAll(target);
    return els.length > 1 ? els : els[0];
  };

  const $body = get('body');
  const $sideNav = get('nav');
  const $sideNavToggleBtn = get('.toggle');

  let isActive_sideNav = false;

  const toggleSideNav = () => {
    $body.classList.remove('preload');

    isActive_sideNav = !isActive_sideNav;
    $sideNav.classList.toggle('active');
  };

  // beforeunload 이벤트는 사용자가 웹페이지를 떠나기(새로고침, 앞으로/뒤로 가기, 브라우저 닫기, form submit 등) 직전에 발생한다.
  document.addEventListener('beforeunload', () => {
    localStorage.setItem('isActive_sideNav', isActive_sideNav);
  });

  const init = () => {
    isActive_sideNav =
      localStorage.getItem('isActive_sideNav') === 'true' ? true : false;

    isActive_sideNav
      ? $sideNav.classList.add('active')
      : $sideNav.classList.remove('active');

    $body.style.visibility = 'visible';

    $sideNavToggleBtn.addEventListener('click', toggleSideNav);
  };
  document.addEventListener('DOMContentLoaded', init);
})();
