export const debounce = (fn, delay) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fnCall, delay);
  };
};
