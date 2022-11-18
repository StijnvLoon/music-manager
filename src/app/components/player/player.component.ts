import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReadDirsEvent } from 'electron/events/ReadDirsEvent';
import { ReadUserSettingsEvent } from 'electron/events/ReadUserSettingsEvent';
import { UserSettings } from 'electron/model/UserSettings';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    //https://css-tricks.com/lets-create-a-custom-audio-player/

    @ViewChild('audioSrc') audioSrc!: ElementRef;

    private dirs: string[] = []

    constructor(
        private eventService: EventService
    ) {

    }

    async ngOnInit() {
        const settings = await this.retrieverSettings()

        //@ts-ignore
        this.dirs = await this.retrieverDirs(settings?.musicFolderPath)

        // const el = this.audioSrc.nativeElement as HTMLSourceElement
        // el.src = dirs[Math.random(0, dirs.length - 1)]
        // el.dispatchEvent()

        // this.nextSong()

    }

    nextSong() {
        const audio = new Audio(this.dirs[Math.floor(Math.random() * (this.dirs.length-1 - 0 + 1) + 0)])
        audio.volume = 0.2
        audio.onended = (ev) => {
            this.nextSong()
        }
        audio.play()
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

    private async retrieverSettings(): Promise<UserSettings | undefined> {
        const event = new ReadUserSettingsEvent()
        await this.eventService.send(event)
        //@ts-ignore
        return event.responsePackage.data
    }

}
