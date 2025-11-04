console.log("Renderer script loaded");

const calculateLayoutSize = () => {
  // The CSS handles most of the layout, just ensure proper sizing
  const container = document.getElementById("webcontents-container");
  if (container) {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const titleBarHeight = 28;
    const containerHeight = windowHeight - titleBarHeight;
    
    container.style.width = windowWidth + "px";
    container.style.height = containerHeight + "px";
  }
};

// Function to update app info from data-home attribute
const updateAppInfo = () => {
  const homeData = JSON.parse(
    document.documentElement.getAttribute("data-home") || '{"title":"Application","icon":""}'
  );
  if (homeData) {
    // Set app title
    const appTitleElement = document.getElementById("app-title");
    if (appTitleElement) {
      appTitleElement.textContent = homeData.title || "Application";
    }

    // Set app icon
    const appIconElement = document.getElementById("app-icon");
    if (appIconElement && homeData.icon) {
      appIconElement.style.backgroundImage = `url(${homeData.icon})`;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  calculateLayoutSize();

  // Dynamic resize function (responsive)
  window.onresize = calculateLayoutSize;

  // Update app info if data-home attribute exists
  if (document.documentElement.hasAttribute("data-home")) {
    updateAppInfo();
  }

  // Home button
  if (document.querySelector("#home")) {
    document.querySelector("#home").onclick = () => {
      const webview = document.querySelector("webview");
      if (webview) {
        const home = webview.getAttribute("data-home");
        if (home) {
          webview.src = home;
        }
      }
    };
  }

  // Back button
  if (document.querySelector("#back")) {
    document.querySelector("#back").onclick = () => {
      const webview = document.querySelector("webview");
      if (webview && webview.canGoBack()) {
        webview.goBack();
      }
    };
  }

  // Forward button
  if (document.querySelector("#forward")) {
    document.querySelector("#forward").onclick = () => {
      const webview = document.querySelector("webview");
      if (webview && webview.canGoForward()) {
        webview.goForward();
      }
    };
  }

  // Refresh button
  if (document.querySelector("#refresh")) {
    document.querySelector("#refresh").onclick = () => {
      const webview = document.querySelector("webview");
      if (webview) {
        webview.reload();
      }
    };
  }

  // Extension button
  if (document.querySelector("#extension-button")) {
    document.querySelector("#extension-button").onclick = () => {
      // Toggle native menu on button click
      const button = document.querySelector("#extension-button");
      const buttonRect = button.getBoundingClientRect();
      
      // Send IPC message to show native menu at button position
      if (window.electron && window.electron.showDropdown) {
        window.electron.showDropdown({
          x: buttonRect.left,
          y: buttonRect.bottom,
        });
      }
    };
  }

  // Window controls
  if (document.querySelector("#minimize-button")) {
    document.querySelector("#minimize-button").onclick = () => {
      if (window.electron && window.electron.minimizeWindow) {
        window.electron.minimizeWindow();
      }
    };
  }

  if (document.querySelector("#maximize-button")) {
    document.querySelector("#maximize-button").onclick = () => {
      if (window.electron && window.electron.maximizeWindow) {
        window.electron.maximizeWindow();
      }
    };
  }

  if (document.querySelector("#close-button")) {
    document.querySelector("#close-button").onclick = () => {
      if (window.electron && window.electron.closeWindow) {
        window.electron.closeWindow();
      }
    };
  }
});
