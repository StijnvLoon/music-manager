import { BrowserWindow, IpcMain, IpcMainEvent } from "electron";
import { ManagerEvent } from "../events/ManagerEvent";
import { ReadDirsEvent } from "../events/ReadDirsEvent";

export class EventHandler {

    private events: ManagerEvent[] = [
        new ReadDirsEvent()
    ]

    constructor(private ipcMain: IpcMain, private win: BrowserWindow) {
        this.events.forEach((managerEvent) => {
            this.ipcMain.on(`${managerEvent.identifier}-req`, (event: IpcMainEvent, data: string) => {
                if(data) {
                    managerEvent.requestPackage = JSON.parse(data)
                    managerEvent.perform(this.win)
                }
            })
        })
    }


}