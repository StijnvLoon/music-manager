import { IRequestPackage } from "../utils/IRequestPackage";
import { IResponsePackage } from "../utils/IResponsePackage";
import { ManagerEvent } from "../model/ManagerEvent";
import { BrowserWindow, IpcMain } from "electron";
import { FfmpegHandler } from "../handlers/FfmpegHandler";

export class ReadMusicFileEvent extends ManagerEvent {

    public identifier: string = "ReadMusicFile"
    public requestPackage: IRequestPackage<string> | undefined;
    public responsePackage: IResponsePackage<ArrayBuffer> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public async perform() {

        //@ts-ignore
        await FfmpegHandler.getInstance().read(this.requestPackage?.data)

        

    }
}