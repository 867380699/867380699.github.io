chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.bilibili.com'},
      })],
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
      ]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
function(message, callback) {
  console.log('message', message);
});

chrome.commands.onCommand.addListener(function(command) {
  switch(command) {
    case "screenshot":
      console.log('Command: screenshot.');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'contentScript.js'},
          screenshotCallback,
        );
      });
      break;
  }
});

var screenshotCallback = function(result) {
  if (result && typeof result[0] === 'string' && result[0].startsWith('data:image')) {
    var filename = getFileName();
    chrome.downloads.download({url:result[0], filename: filename}, function() {

    });
  }
}

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
    (Math.random()*1000).toFixed(0).padStart(3,0),
    '.png'
  ].join('')
}