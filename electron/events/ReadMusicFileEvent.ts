import { RequestPackage } from "../utils/RequestPackage";
import { ResponsePackage } from "../utils/ResponsePackage";
import { ManagerEvent } from "./ManagerEvent";
import { BrowserWindow, IpcMain } from "electron";
import { FfmpegHandler } from "../handlers/FfmpegHandler";

export class ReadMusicFileEvent extends ManagerEvent {

    public identifier: string = "ReadMusicFile"
    public requestPackage: RequestPackage<string> | undefined;
    public responsePackage: ResponsePackage<ArrayBuffer> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public async perform() {

        //@ts-ignore
        await FfmpegHandler.getInstance().read(this.requestPackage?.data)

        

    }
}