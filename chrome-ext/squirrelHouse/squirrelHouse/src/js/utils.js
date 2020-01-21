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

const dominRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img;

function extraDomin(url) {
  const match = dominRegex.exec(url);
  return match && match[1];
}

export default {
  debounce,
  currentTimestamp
}