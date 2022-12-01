import { Component } from '@angular/core';
import { iconTransitionAnim } from 'src/app/animations/DefaultAnims';
import { PlayerHistory } from 'src/app/models/PlayerHistory';
import { IPlayer, PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    animations: [
        iconTransitionAnim
    ]
})
export class PlayerComponent implements IPlayer {
    //https://css-tricks.com/lets-create-a-custom-audio-player/

    history: PlayerHistory
    audio: HTMLAudioElement
    isPlaying: boolean = false

    timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    constructor(
        private PlayerService: PlayerService
    ) {
        this.audio = new Audio()
        this.history = new PlayerHistory()
        this.PlayerService.player = this
    }

    async play(source: string) {
        this.audio.src = source
        this.audio.play()
        this.isPlaying = true
        this.history.add(source)

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
        }
    }
    
    previous() {
        const song = this.history.previous()
        if(song) this.play(song)
    }

}
