export const get = (target) => {
    const els = document.querySelectorAll(target);
    return els.length > 1 ? els : els[0];
  };


/**
 * 
 * @param { string } domType 생성할 dom의 타입 : div, a, li... 
 * @param { object } propertMap 생성할 dom의 속성들을 담은 객체
 * @returns HTMLElement
 */

export const makeDOMwithProperties = (domType, propertMap) => {
    const dom = document.createElement(domType);
    Object.keys(propertMap).forEach(key => {
        dom[key] = propertMap[key];
    });

    return dom;
}


/**
 * @param { HTMLElement } target 자식노드를 추가할 부모노드
 * @param { Array } childrenList 자식노드들의 배열
*/
export const appendChildList = (target, childrenList) => {
    if(!Array.isArray(childrenList)) return;

    childrenList.forEach(child => {
        target.appendChild(child);
    });

}