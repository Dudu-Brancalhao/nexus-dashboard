import { ToastType } from '../contexts/ToastContext';

type ToastCallback = (message: string, type: ToastType) => void;

class ToastManager {
  private callback: ToastCallback | null = null;

  setCallback(callback: ToastCallback) {
    this.callback = callback;
  }

  show(message: string, type: ToastType = 'info') {
    if (this.callback) {
      this.callback(message, type);
    } else {
      console.warn('Toast callback not set');
    }
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}

export const toast = new ToastManager();
