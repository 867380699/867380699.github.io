function getDataURI() {
  var video = document.querySelector('video');
  var canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  var dataURI = canvas.toDataURL();
  return dataURI;
}

function getVid() {
  var m = /av[0-9]+/.exec(location.href);
  return m ? m[0] : 'av0000';
};

function getPlayTime() {
  var currentTime = document.querySelector('video').currentTime;
  var mins = Math.floor(currentTime / 60);
  var milliseconds = Math.floor((currentTime % 60)*1000);
  return [mins.toString().padStart(2,0), milliseconds.toString().padStart(5,0)].join('-');
}

function screenshot() {
  return {
    dataURI: getDataURI(),
    filename: [getVid(), '-', getPlayTime(), '.png'].join('')
  }
}

screenshot();