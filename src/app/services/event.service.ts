import { Injectable, NgZone } from '@angular/core';
import { ManagerEvent } from 'electron/events/ManagerEvent';
import { ResponsePackage } from 'electron/utils/ResponsePackage';
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(
        private zone: NgZone
    ) { }

    send(managerEvent: ManagerEvent): Promise<ResponsePackage<any>> {

        return new Promise((resolve, reject) => {
            electron.ipcRenderer.on(`${managerEvent.identifier}-resp`, (event: any, resultData: string) => {
                this.zone.run(() => {
                    resolve(JSON.parse(resultData))
                    // TODO
                    //electron.ipcRenderer.removeListener(managerEvent.identifier, this)
                })
            })
            electron.ipcRenderer.send(`${managerEvent.identifier}-req`, JSON.stringify(managerEvent.requestPackage))
        })
    }
}
