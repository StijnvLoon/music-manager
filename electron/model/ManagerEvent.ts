import { BrowserWindow, IpcMain, IpcMainEvent } from "electron"
import { IResponsePackage } from "../utils/IResponsePackage"
import { IRequestPackage } from "../utils/IRequestPackage"

export abstract class ManagerEvent {

    protected electronData: { win: BrowserWindow, ipcMain: IpcMain } | undefined

    public abstract readonly identifier: string
    public abstract requestPackage: IRequestPackage<any> | undefined
    public abstract responsePackage: IResponsePackage<any> | undefined
    public abstract perform(): void

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        this.electronData = electronData

        setTimeout(() => {
            if (this.electronData) {
                this.electronData.ipcMain.on(`${this.identifier}-req`, (event: IpcMainEvent, data: string | undefined) => {
                    if(data) {
                        this.requestPackage = JSON.parse(data)
                    } else {
                        this.requestPackage = JSON.parse('{"data": ""}')
                    }
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