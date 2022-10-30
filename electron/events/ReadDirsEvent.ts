import { RequestPackage } from "../utils/RequestPackage";
import { ResponsePackage } from "../utils/ResponsePackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "./ManagerEvent";
import { BrowserWindow, IpcMain } from "electron";

export class ReadDirsEvent extends ManagerEvent {

    private fileHandler: FileHandler = new FileHandler()

    public identifier: string = "ReadDirs"
    public requestPackage: RequestPackage<string> | undefined;
    public responsePackage: ResponsePackage<string[]> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public perform(): void {
        this.prePerform()

        //@ts-ignore
        this.fileHandler.retrieveDirs(this.requestPackage.data).then((dirs) => {
            this.responsePackage = { statusCode: 200, data: dirs }
            this.sendResponse()
        })
    }
}