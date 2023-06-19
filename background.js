const contextMenuItem = {
    "id": "unicodeConverter",
    "title": "Convert from Unicode",
    "contexts": ["selection"]

}

chrome.contextMenus.create(contextMenuItem)

chrome.contextMenus.onClicked.addListener(function(_, tab){
    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        files: ['contentScript.js']
    })
  });
