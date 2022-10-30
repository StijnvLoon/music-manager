import { BrowserWindow } from "electron";
import { RequestPackage } from "../utils/RequestPackage";
import { FileHandler } from "../handlers/FileHandler";
import { ManagerEvent } from "./ManagerEvent";

export class ReadDirsEvent implements ManagerEvent {

    private fileHandler: FileHandler = new FileHandler()

    identifier: string = "ReadDirs"
    requestPackage: RequestPackage<string> | undefined

    constructor(pack?: RequestPackage<string>) {
        this.requestPackage = pack
    }

    perform(win: BrowserWindow) {
        if (!this.requestPackage) throw `No package found in ${this.identifier}`

        this.fileHandler.retrieveDirs(this.requestPackage.data).then((dirs) => {
            win.webContents.send(`${this.identifier}-resp`, JSON.stringify(dirs))
        })
    }
}