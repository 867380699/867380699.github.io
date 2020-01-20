function debounce(fn, delay) {
  var timer;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function currentTimestamp() {
  return new Date().getTime()
}

export default {
  debounce,
  currentTimestamp
}