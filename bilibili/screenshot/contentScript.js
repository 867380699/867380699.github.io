function getFileName(){
  var date = new Date();
  return [
    date.getFullYear(),
    date.getDate().toString().padStart(2,0),
    date.getDay().toString().padStart(2,0),
    date.getHours().toString().padStart(2,0),
    date.getMinutes().toString().padStart(2,0),
    date.getSeconds().toString().padStart(2,0),
    date.getMilliseconds().toString().padStart(3,0),
    (Math.random()*1000).toFixed(0).padStart(3,0)
  ].join('')
}

function screenshot() {
  var video = document.querySelector('video')
  var canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  var dataURI = canvas.toDataURL();
  var link = document.createElement("a");
  link.download = getFileName();
  link.href = dataURI;
  link.click();
}
screenshot();