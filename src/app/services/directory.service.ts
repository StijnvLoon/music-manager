import { Injectable } from '@angular/core';
import { ReadDirsEvent } from 'electron/events/ReadDirsEvent';
import { Directory } from 'electron/model/Directory';
import { EventService } from './event.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class DirectoryService {

    constructor(
        private settingsService: SettingsService,
        private eventService: EventService
    ) { }

    getDirs(path?: string): Promise<Directory[]> {
        return new Promise(async (resolve, reject) => {
            const dirs = await this.retrieveDirs(path)
            if(dirs) {
                resolve(dirs)
            } else {
                reject(dirs)
            }
        })
    }

    private async retrieveDirs(path?: string) {
        const event = new ReadDirsEvent()
        event.requestPackage = {
            data: path ? path : (await this.settingsService.settings).musicFolderPath
        }

        await this.eventService.send(event)

        //@ts-ignore
        return event.responsePackage.data
    }




}
