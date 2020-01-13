chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.bilibili.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.runtime.onMessage.addListener(
function(message, callback) {
  console.log('message', message);
});
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  switch(command) {
    case "screenshot":
      console.log('take screenshot.');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('script')
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'contentScript.js'});
      });
      break;
  }
});

