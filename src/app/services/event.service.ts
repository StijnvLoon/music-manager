import { Injectable, NgZone } from '@angular/core';
import { ManagerEvent } from 'electron/model/ManagerEvent';
const electron = (<any>window).require('electron');

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(
        private zone: NgZone
    ) { }

    send(managerEvent: ManagerEvent): Promise<void> {

        return new Promise((resolve, reject) => {
            const onData = (event: any, resultData: string) => {
                electron.ipcRenderer.removeListener(`${managerEvent.identifier}-resp`, onData)

                this.zone.run(() => {
                    managerEvent.responsePackage = JSON.parse(resultData)
                    resolve()
                })
            }

            electron.ipcRenderer.on(`${managerEvent.identifier}-resp`, onData)
            electron.ipcRenderer.send(`${managerEvent.identifier}-req`, JSON.stringify(managerEvent.requestPackage))
        })
    }
}
