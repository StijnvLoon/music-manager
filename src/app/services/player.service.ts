import { Injectable } from '@angular/core';
import { PlayerHistory } from '../models/PlayerHistory';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    private _player?: IPlayer

    constructor() { }

    set player(player: IPlayer) {
        this._player = player
    }

    async play(source: string) {
        this._player?.play(source)
    }
    pause(): void {
        this._player?.pause()
    }
    resume(): void {
        this._player?.resume()
    }
    toggle(): void {
        this._player?.toggle()
    }
    previous(): void {
        this._player?.previous()
    }
}

export interface IPlayer {
    history: PlayerHistory
    audio: HTMLAudioElement
    play(source: string): void
    pause(): void
    resume(): void
    toggle(): void
    previous(): void
}
