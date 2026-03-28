const STORAGE_KEY = 'hermione-calc-last-result';

/**
 * Save the last calculation result to localStorage.
 * @param {object} result — the object returned by calculateAge()
 */
export function saveResult(result) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    /* quota exceeded — silently fail */
  }
}

/**
 * Load the last saved calculation result.
 * @returns {object|null}
 */
export function loadResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
