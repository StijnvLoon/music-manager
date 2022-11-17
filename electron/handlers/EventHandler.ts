import { BrowserWindow, IpcMain } from "electron";
import { ReadMusicFileEvent } from "../events/ReadMusicFileEvent";
import { ManagerEvent } from "../model/ManagerEvent";
import { ReadDirsEvent } from "../events/ReadDirsEvent";
import { ReadUserSettingsEvent } from "../events/ReadUserSettingsEvent";
import { SaveUserSettingsEvent } from "../events/SaveUserSettingsEvent";

export class EventHandler {

    private events: ManagerEvent[]

    constructor(ipcMain: IpcMain, win: BrowserWindow) {
        this.events = [
            new ReadDirsEvent({ win: win, ipcMain: ipcMain }),
            new ReadMusicFileEvent({ win: win, ipcMain: ipcMain }),
            new ReadUserSettingsEvent({ win: win, ipcMain: ipcMain }),
            new SaveUserSettingsEvent({ win: win, ipcMain: ipcMain })
        ]
    }
}