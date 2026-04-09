// 点击工具栏按钮
chrome.action.onClicked.addListener((tab) => {
  share(tab);
});

// 安装时创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "share-page",
    title: "Share this page",
    contexts: ["page"]
  });
});

// 右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "share-page") {
    share(tab);
  }
});

// 注入执行分享逻辑
function share(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          text: document.title,
          url: location.href
        }).catch(err => console.error("Share failed:", err));
      } else {
        alert("Your browser does not support system share.");
      }
    }
  });
}