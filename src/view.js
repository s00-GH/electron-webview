const electron = require("electron");
const { BrowserView } = electron; // https://www.electronjs.org/docs/api/browser-view

exports.createBrowserView = (mainWindow) => {
  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 1024, height: 768 });
  view.webContents.loadURL("data:text/html,<h1>BrowserView Test</h1><p>This is a test page.</p>");
};
