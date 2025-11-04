// Electron
const { app, Menu, ipcMain } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);

  // Option 1: Uses Webtag and load a custom html file with external content
  mainWindow.loadFile("index.html");
  //mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Option 2: Load directly an URL if you don't need interface customization
  //mainWindow.loadURL("https://example.com");

  // Option 3: Uses BrowserView to load an URL
  //const view = require("./src/view");
  //view.createBrowserView(mainWindow);

  // Display Dev Tools
  //mainWindow.openDevTools();

  // Hide the native menu bar completely
  Menu.setApplicationMenu(null);

  // IPC handlers for window controls
  ipcMain.on('window-minimize', () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on('window-close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  ipcMain.on('show-dropdown', (event, data) => {
    // For now, just log the dropdown request
    console.log('Show dropdown at:', data);
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  //if (process.platform !== "darwin") {
  app.quit();
  //}
});
