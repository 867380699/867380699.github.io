var pluginActive = false;

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

function tabActivatedListener(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
    console.log('tabActivated', tab);
    pluginActive = /bilibili.com/.test(tab.url);
    setPluginEnable();
  });
};

chrome.tabs.onActivated.addListener(tabActivatedListener);

function windowFocusChangedListener(windowId) {
  chrome.windows.getCurrent({populate: true}, function (window) {
    var biliTab = window.tabs.find(function(tab){
      return /bilibili.com/.test(tab.url);
    });
    pluginActive = biliTab && biliTab.active;
    setPluginEnable();
  });
};

chrome.windows.onFocusChanged.addListener(windowFocusChangedListener); 

function tabUpdateListener(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log('update', tabId, changeInfo, tab);

    pluginActive = /bilibili.com/.test(tab.url) && tab.active;
    setPluginEnable();
  }
}

chrome.tabs.onUpdated.addListener(tabUpdateListener);

chrome.commands.onCommand.addListener(function(command) {
  switch(command) {
    case "screenshot":
      console.log('Command: screenshot.');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (pluginActive && tabs && tabs.length) {
          chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'contentScript.js'},
            screenshotCallback,
          );
        }
      });
      break;
  }
});

var screenshotCallback = function(result) {
  if (pluginActive && result && typeof result[0] === 'string' && result[0].startsWith('data:image')) {
    var filename = getFileName();
    chrome.downloads.download({url:result[0], filename: filename}, function() {
      showNotification();
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

function setPluginEnable() {
  console.log('setPluginEnable', pluginActive);
  chrome.downloads.setShelfEnabled(!pluginActive);
}

function showNotification() {
  chrome.notifications.create('bilibili screenshot', {
    type: chrome.notifications.TemplateType.BASIC,
    title: 'Blilbili Screenshot',
    message: 'success',
    iconUrl: 'images/favicon128.png'
  }, function(id) {
    setTimeout(function(){
      chrome.notifications.clear(id);
    }, 1500);
});
}