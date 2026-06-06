import { createElement, getOrCreateContainer } from '../utils/dom.js';

class ToastManager {
    constructor() {
        this.container = null;
        this.defaultDuration = 3000;
        this.toasts = new Set();
    }

    init() {
        this.container = getOrCreateContainer('my-toast-container', 'my-toast-container');
    }

    show(message, type = 'default', duration = this.defaultDuration) {
        if (!this.container) this.init();

        // Создаём toast с базовыми классами
        const toast = createElement('div', ['my-toast']);

        // Добавляем цвет фона через утилиту bg-*
        const bgClass = type === 'default' ? 'bg-dark' : `bg-${type}`;
        toast.classList.add(bgClass);

        // Для warning добавляем класс для тёмного текста
        if (type === 'warning') {
            toast.classList.add('my-toast-warning');
        }

        const textSpan = createElement('span', ['my-toast-message'], {});
        textSpan.textContent = message;

        const closeBtn = createElement('button', ['my-toast-close'], {});
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => this.hide(toast);

        toast.appendChild(textSpan);
        toast.appendChild(closeBtn);
        this.container.appendChild(toast);

        setTimeout(() => toast.classList.add('my-toast-show'), 10);

        const timeoutId = setTimeout(() => this.hide(toast), duration);
        this.toasts.add({ toast, timeoutId });

        return toast;
    }

    hide(toast) {
        const existing = Array.from(this.toasts).find(t => t.toast === toast);
        if (existing) {
            clearTimeout(existing.timeoutId);
            this.toasts.delete(existing);
        }

        toast.classList.remove('my-toast-show');
        toast.classList.add('my-toast-hide');

        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }
}

export const toast = new ToastManager();