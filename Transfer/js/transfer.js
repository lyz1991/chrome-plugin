const target = document.getElementById('res')
function jsonp(obj) {
  window["callback"] = function(object) {
        obj.success(object);
    }
    var script = document.createElement("script");
    script.src = obj.url;
    console.log(2)
    document.getElementsByTagName('head')[0].appendChild(script);
}
function deleteScript() {
  document.head.removeChild(document.head.children[document.head.children.length-1])
}
function getTransApi(to) {
  const input = document.getElementById('input')
  const salt =123456899;
  const appid ='20190717000318782'
  const key = '74SSu0SanmdzoamPijB2'
  const sign = 	md5(`${appid}${input.value}${salt}${key}`)
  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?callback=callback&q=${input.value}&from=auto&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`
  console.log(to)
  jsonp({
    url: url,
    success: function (res) {
      const prefix = to === 'zh' ? '中文: ' : '英文：'
      target.innerHTML = `${prefix}${res.trans_result[0].dst}`
      deleteScript()
    }
  })
}
document.getElementById('ctoe').addEventListener('click', function () {
  target.innerHTML = ''
  getTransApi('en')
})
document.getElementById('etoc').addEventListener('click', function () {
  target.innerHTML = ''
  getTransApi('zh')
})
function getCurrentTabId(callback) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function(response) {
			if(callback) callback(response);
		});
	});
}


sendMessageToContentScript('你好，我是bg！', (response) => {
  if(response) {
    document.getElementById('input').value = response
    target.innerHTML = ''
    getTransApi('zh')
  }
});

