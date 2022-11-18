import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadDirsEvent } from 'electron/events/ReadDirsEvent';
import { ReadMusicFileEvent } from 'electron/events/ReadMusicFileEvent';
import { ReadUserSettingsEvent } from 'electron/events/ReadUserSettingsEvent';
import { UserSettings } from 'electron/model/UserSettings';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    constructor(
        private eventService: EventService,
        private router: Router
    ) {
    }

    async ngOnInit() {
        const settings = await this.retrieverSettings()
        if (!settings) this.router.navigateByUrl('/setup')

        // //@ts-ignore
        // const dirs: string[] = await this.retrieverDirs(settings?.musicFolderPath)
        // const musicData: any = await this.readDir(dirs[5])
        // console.log(musicData)

    }

    private async retrieverDirs(dir: string): Promise<string[]> {
        const event = new ReadDirsEvent()
        event.requestPackage = {
            data: dir
        }

        await this.eventService.send(event)

        //@ts-ignore
        return event.responsePackage.data
    }

    private async readDir(url: string): Promise<any> {
        const event = new ReadMusicFileEvent()
        event.requestPackage = {
            data: url
        }

        await this.eventService.send(event)

        return event.responsePackage?.data
    }

    private async retrieverSettings(): Promise<UserSettings | undefined> {
        const event = new ReadUserSettingsEvent()
        await this.eventService.send(event)
        //@ts-ignore
        return event.responsePackage.data
    }

}
