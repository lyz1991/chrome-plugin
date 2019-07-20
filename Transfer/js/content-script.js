chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  console.log(`收到:${request}${JSON.stringify(sender)}${sendResponse}`)
		sendResponse(window.getSelection().toString());
	}
);
