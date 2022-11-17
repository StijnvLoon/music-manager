import { IRequestPackage } from "../utils/IRequestPackage";
import { IResponsePackage } from "../utils/IResponsePackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "../model/ManagerEvent";
import { UserSettings } from "../model/UserSettings";
import { BrowserWindow, IpcMain } from "electron";

export class ReadUserSettingsEvent extends ManagerEvent {

    public identifier: string = "ReadUserSettings"
    public requestPackage: IRequestPackage<undefined> | undefined;
    public responsePackage: IResponsePackage<UserSettings | undefined> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public perform(): void {
        this.prePerform()

        FileHandler.readFile("UserSettings.json")
            .then((data: Buffer) => {
                this.responsePackage = { statusCode: 200, data: new UserSettings(JSON.parse(data.toString())) }
                this.sendResponse()
            })
            .catch((err) => {
                this.responsePackage = { statusCode: 500, data: undefined }
                this.sendResponse()
            })
    }
}