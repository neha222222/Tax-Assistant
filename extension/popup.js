document.addEventListener("DOMContentLoaded", function () {

  const showOnLargeVideosCheckbox =
    document.getElementById("showOnLargeVideos");
  const showOnSmallVideosCheckbox =
    document.getElementById("showOnSmallVideos");

  const savedShowOnLargeVideos =
    localStorage.getItem("tubechat-long-video") === "true";
  const savedShowOnSmallVideos =
    localStorage.getItem("tubechat-small-video") === "true";

  showOnLargeVideosCheckbox.checked = savedShowOnLargeVideos;
  showOnSmallVideosCheckbox.checked = savedShowOnSmallVideos;

  showOnLargeVideosCheckbox.addEventListener("change", function () {
    const isChecked = showOnLargeVideosCheckbox.checked;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        type: "messageFromPopup",
        data: isChecked,
      });
    });
  });

  showOnSmallVideosCheckbox.addEventListener("change", function () {
    const isChecked = showOnLargeVideosCheckbox.checked;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        type: "messageFromPopup",
        data: isChecked,
      }); 
    });
  });
});