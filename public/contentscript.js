chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello') {
      console.log(request.url) // new url is now in content scripts!
    }
});

  var chatVisibility = false;
  
  
  var button = document.createElement("button");
  button.innerHTML = "Chat";
  button.style.position = "fixed";
  button.style.right =  "1%";
  button.style.bottom = "1%";
  button.style.width = "5%";
  button.style.height = "5%";
  button.style.zIndex = "20000";

// 2. Append somewhere
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);
 


  var iFrame  = document.createElement ("iframe");
  iFrame.src  = chrome.runtime.getURL ("index.html");
  iFrame.style.position = "fixed";
  iFrame.style.border = "none";
  iFrame.style.right =  "1%";
  iFrame.style.bottom = "6%";
  iFrame.style.width = "20%";
  iFrame.style.height = "45%";
  iFrame.style.zIndex = "20000";
  iFrame.setAttribute("scrolling", "no");
  iFrame.setAttribute("hidden", "");
  iFrame.setAttribute("allow", "camera,microphone");
  
  
  document.body.insertBefore (iFrame, document.body.nextSibling);
  
  button.addEventListener ("click", function() {
    if (chatVisibility)
	{
		iFrame.setAttribute("hidden", "");
	}
	else
	{
		iFrame.removeAttribute("hidden");
	}
	chatVisibility = !chatVisibility;
	
  });