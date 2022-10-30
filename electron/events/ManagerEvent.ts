import { BrowserWindow, IpcMain, IpcMainEvent } from "electron"
import { ResponsePackage } from "../utils/ResponsePackage"
import { RequestPackage } from "../utils/RequestPackage"

export abstract class ManagerEvent {

    protected electronData: { win: BrowserWindow, ipcMain: IpcMain } | undefined

    public abstract readonly identifier: string
    public abstract requestPackage: RequestPackage<any> | undefined
    public abstract responsePackage: ResponsePackage<any> | undefined
    public abstract perform(): void

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        this.electronData = electronData

        setTimeout(() => {
            if (this.electronData) {
                this.electronData.ipcMain.on(`${this.identifier}-req`, (event: IpcMainEvent, data: string) => {
                    this.requestPackage = JSON.parse(data)
                    this.perform()
                })
            }
        });
    }

    protected prePerform() {
        if (!this.requestPackage) throw `RequestPackage undefined ${this.identifier}`
    }

    protected sendResponse() {
        if (!this.electronData) throw `Event has no ElectronData: ${this.identifier}`
        if (!this.responsePackage) throw `ResponsePackage not defined in ${this.identifier}`

        this.electronData.win.webContents.send(`${this.identifier}-resp`, JSON.stringify(this.responsePackage))
    }

}