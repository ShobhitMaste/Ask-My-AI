
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const answer = request.answer;
  const answerID = request.answerID;
  const tabID = request.tabId;
  console.log("answer - " + answer);
  console.log("answer id = " + answerID);
  console.log("tab id  - ", tabID);
  
  sendResponse({ fromcontent: "This message is from content.js", request, sender });
});