import { toast } from './components/Toast.js';

// Создаём глобальный объект
window.MyUtils = {
    toast: (message, duration) => toast.show(message, 'default', duration),
    toastSuccess: (message, duration) => toast.success(message, duration),
    toastError: (message, duration) => toast.error(message, duration),
    toastWarning: (message, duration) => toast.warning(message, duration),
};

// Для удобства - добавляем методы прямо на функцию toast
const toastFn = (message, duration) => toast.show(message, 'default', duration);
toastFn.success = (message, duration) => toast.success(message, duration);
toastFn.error = (message, duration) => toast.error(message, duration);
toastFn.warning = (message, duration) => toast.warning(message, duration);

window.MyUtils.toast = toastFn;

// Автоинициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => toast.init());
} else {
    toast.init();
}

export { toast };