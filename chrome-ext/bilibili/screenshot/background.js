var pluginActive = false;

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
      return /bilibili.com/.test(tab.url) && tab.active;
    });
    pluginActive = !!biliTab;
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
  // console.log(result);
  if (pluginActive && result && result[0] && result[0].filename && result[0].dataURI) {
    if (typeof result[0].dataURI === 'string' && result[0].dataURI.startsWith('data:image')) {
      chrome.downloads.download({url: result[0].dataURI, filename: result[0].filename}, function() {
        showNotification();
      });
    }
  }
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