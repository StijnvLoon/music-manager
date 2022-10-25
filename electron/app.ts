import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

// https://developer.okta.com/blog/2019/03/20/build-desktop-app-with-angular-electron

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/music-manager/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
