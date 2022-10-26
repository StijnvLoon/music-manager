import { app, BrowserWindow, ipcMain } from "electron";
import * as contextMenu from 'electron-context-menu'
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

let mainWindow: BrowserWindow | undefined;

contextMenu({
    prepend: (defaultActions, params, browserWindow: any) => [
        {
            label: 'Open console',
            click: () => {
                browserWindow.openDevTools()
            }
        }
    ]
});


function createWindow() {
    mainWindow = new BrowserWindow({
        show: false
    });

    mainWindow.maximize()
    mainWindow.menuBarVisible = false

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `../../dist/music-manager/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.on("closed", () => {
        mainWindow = undefined;
    });
}

app.on("ready", createWindow);

app.on("activate", () => {
    if (mainWindow === null) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
