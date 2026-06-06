/**
 * DOM утилиты
 */

export function createElement(tag, classes = [], attributes = {}) {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value);
    });
    return el;
}

export function appendToBody(el) {
    document.body.appendChild(el);
}

export function removeFromBody(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
}

export function getOrCreateContainer(containerId, containerClass) {
    let container = document.getElementById(containerId);
    if (!container) {
        container = createElement('div', [containerClass], { id: containerId });
        appendToBody(container);
    }
    return container;
}