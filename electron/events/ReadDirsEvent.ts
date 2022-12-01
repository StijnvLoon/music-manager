import { IRequestPackage } from "../utils/IRequestPackage";
import { IResponsePackage } from "../utils/IResponsePackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "../model/ManagerEvent";
import { BrowserWindow, IpcMain } from "electron";
import { Directory } from "../model/Directory";
import * as path from "path";

export class ReadDirsEvent extends ManagerEvent {

    public identifier: string = "ReadDirs"
    public requestPackage: IRequestPackage<string> | undefined;
    public responsePackage: IResponsePackage<Directory[]> | undefined;

    constructor(electronData?: { win: BrowserWindow, ipcMain: IpcMain }) {
        super(electronData)
    }

    public perform(): void {
        this.prePerform()

        //@ts-ignore
        FileHandler.retrieveDirs(this.requestPackage.data).then(async (dirs) => {

            const directories: Directory[] = []

            dirs.forEach((dir) => {
                const pathStats = path.parse(dir)
                if (pathStats.ext) {
                    directories.push({
                        type: 'file',
                        fullDir: dir,
                        name: pathStats.name,
                        fullName: pathStats.base,
                        extension: pathStats.ext
                    })
                } else {
                    directories.push({
                        type: 'folder',
                        fullDir: dir,
                        name: pathStats.name,
                    })
                }
            })

            this.responsePackage = { statusCode: 200, data: directories }
            this.sendResponse()
        })
    }
}