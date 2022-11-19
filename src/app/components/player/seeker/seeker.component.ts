import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-seeker',
    templateUrl: './seeker.component.html',
    styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

    @Input() audio!: HTMLAudioElement

    // length of audio in user friendly string format
    audioLength: string = "0:00"
    // progress of audio in user friendly string format
    audioProgress: string = "0:00"
    // length of audio in numbers
    seekerMax: number = 1000
    // progress of audio in numbers
    seekerProgress: number = 0

    constructor() { }

    ngOnInit(): void {
        this.audio.addEventListener('loadedmetadata', () => {
            this.audioLength = this.timeToString(this.audio.duration)
            this.seekerMax = Math.floor(this.audio.duration)
        });
        this.audio.addEventListener('timeupdate', () => {
            this.audioProgress = this.timeToString(this.audio.currentTime)
            this.seekerProgress = Math.floor(this.audio.currentTime)
        })
    }

    updateProgress(seconds: any) {
        this.audio.currentTime = seconds
    }

    private timeToString(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

}
