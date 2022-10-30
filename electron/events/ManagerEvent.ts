import { BrowserWindow } from "electron"
import { RequestPackage } from "../utils/RequestPackage"

export interface ManagerEvent {

    identifier: string
    requestPackage: RequestPackage<any> | undefined
    perform: (win: BrowserWindow) => void

}