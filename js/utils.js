// (optional helpers for future use)

export function $(selector) {
    return document.querySelector(selector);
  }
  
  export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
  