import { IRequestPackage } from "../utils/IRequestPackage";
import { IResponsePackage } from "../utils/IResponsePackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "../model/ManagerEvent";
import { BrowserWindow, IpcMain } from "electron";

export class ReadDirsEvent extends ManagerEvent {

    public identifier: string = "ReadDirs"
    public requestPackage: IRequestPackage<string> | undefined;
    public responsePackage: IResponsePackage<string[]> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public perform(): void {
        this.prePerform()

        //@ts-ignore
        FileHandler.retrieveDirs(this.requestPackage.data).then((dirs) => {
            this.responsePackage = { statusCode: 200, data: dirs }
            this.sendResponse()
        })
    }
}