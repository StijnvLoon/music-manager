import { IRequestPackage } from "../utils/IRequestPackage";
import { IResponsePackage } from "../utils/IResponsePackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "../model/ManagerEvent";
import { UserSettings } from "../model/UserSettings";
import { BrowserWindow, IpcMain } from "electron";

export class SaveUserSettingsEvent extends ManagerEvent {

    public identifier: string = "SaveUserSettings"
    public requestPackage: IRequestPackage<UserSettings> | undefined;
    public responsePackage: IResponsePackage<undefined> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public perform(): void {
        this.prePerform()

        //@ts-ignore
        FileHandler.writeFile("UserSettings.json", JSON.stringify(this.requestPackage?.data))
            .then(() => {
                this.responsePackage = { statusCode: 200, data: undefined }
                this.sendResponse()
            })
            .catch((err) => {
                this.responsePackage = { statusCode: 500, data: undefined }
                this.sendResponse()
            })
    }
}