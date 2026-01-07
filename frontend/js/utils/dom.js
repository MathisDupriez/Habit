/**
 * Utilitaires DOM
 */
const DomUtils = {
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
