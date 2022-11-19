import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReadDirsEvent } from 'electron/events/ReadDirsEvent';
import { ReadUserSettingsEvent } from 'electron/events/ReadUserSettingsEvent';
import { UserSettings } from 'electron/model/UserSettings';
import { iconTransitionAnim } from 'src/app/animations/DefaultAnims';
import { PlayerHistory } from 'src/app/models/PlayerHistory';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    animations: [
        iconTransitionAnim
    ]
})
export class PlayerComponent implements OnInit {
    //https://css-tricks.com/lets-create-a-custom-audio-player/

    history: PlayerHistory
    audio: HTMLAudioElement
    dirs: string[] = []
    isPlaying: boolean = false

    timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    constructor(
        private eventService: EventService
    ) {
        this.audio = new Audio()
        this.history = new PlayerHistory()
    }

    async ngOnInit() {
        const settings = await this.retrieverSettings()
        //@ts-ignore
        this.dirs = await this.retrieverDirs(settings?.musicFolderPath)
    }

    async play(dir: string) {
        this.audio.src = dir
        this.audio.play()
        this.isPlaying = true

        // slowly turn volume up
        while(this.audio.volume < 1 && this.isPlaying) {
            if(this.audio.volume + 0.05 >= 1) {
                this.audio.volume = 1
            } else {
                this.audio.volume += 0.05
            }
            await this.timer(20)
        }
    }

    async pause() {
        this.isPlaying = false

        // slowly turn volume down
        while(this.audio.volume > 0.06 && !this.isPlaying) {
            if(this.audio.volume - 0.05 >= 0) this.audio.volume -= 0.05
            await this.timer(20)
        }

        if(!this.isPlaying) {
            this.audio.pause()
        }
    }

    async resume() {
        if (this.audio.src) {
            this.audio.play()
            this.isPlaying = true
        }

        // slowly turn volume up
        while(this.audio.volume < 1 && this.isPlaying) {
            if(this.audio.volume + 0.05 >= 1) {
                this.audio.volume = 1
            } else {
                this.audio.volume += 0.05
            }
            await this.timer(20)
        }

    }

    get hasSource(): boolean {
        return this.audio.src ? true : false
    }

    toggle() {
        if (!this.isPlaying && this.hasSource) {
            this.resume()
        } else if (this.isPlaying){
            this.pause()
        } else {
            this.next()
        }
    }

    next() {
        const song = this.getRandomSong()
        this.history.add(song)
        this.play(song)
    }
    
    previous() {
        const song = this.history.previous()
        if(song) this.play(song)
    }
    
    getRandomSong(): string {
        return this.dirs[Math.floor(Math.random() * (this.dirs.length - 1 - 0 + 1) + 0)]
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
