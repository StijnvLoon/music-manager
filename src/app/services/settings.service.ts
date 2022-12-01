import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReadUserSettingsEvent } from 'electron/events/ReadUserSettingsEvent';
import { UserSettings } from 'electron/model/UserSettings';
import { EventService } from './event.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private _settings: UserSettings | undefined

    constructor(
        private eventService: EventService,
        private router: Router
    ) { }

    get settings(): Promise<UserSettings> {
        return new Promise(async (resolve, reject) => {
            if(this._settings) {
                resolve(this._settings)
            } else {
                await this.retrieveSettings()
                //@ts-ignore
                resolve(this._settings)
            }
        })
    }

    private async retrieveSettings() {
        const event = new ReadUserSettingsEvent()
        await this.eventService.send(event)
        //@ts-ignore
        this._settings = event.responsePackage.data

        if(!this._settings) this.router.navigateByUrl('/setup')
    }
}
