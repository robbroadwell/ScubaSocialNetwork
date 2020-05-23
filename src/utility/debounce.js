export default function debounce(fn, time) {
    let timeout;
    return function() {
      const args = arguments;
      const functionCall = () => fn.apply(this, args);
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }