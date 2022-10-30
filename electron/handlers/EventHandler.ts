import { BrowserWindow, IpcMain, IpcMainEvent } from "electron";
import { ManagerEvent } from "../events/ManagerEvent";
import { ReadDirsEvent } from "../events/ReadDirsEvent";

export class EventHandler {

    private events: ManagerEvent[]

    constructor(ipcMain: IpcMain, win: BrowserWindow) {
        this.events = [
            new ReadDirsEvent({ win: win, ipcMain: ipcMain })
        ]
    }


}