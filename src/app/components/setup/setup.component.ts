import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUserSettingsEvent } from 'electron/events/SaveUserSettingsEvent';
import { UserSettings } from 'electron/model/UserSettings';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

    settingsForm = new FormGroup({
        music_folderControl: new FormControl('', [
            Validators.required,
        ]),
        ffmpeg_locationControl: new FormControl('', [
            Validators.required,
        ]),
        ffprobe_locationControl: new FormControl('', [
            Validators.required,
        ]),
    })

    constructor(
        private eventService: EventService,
        private router: Router
    ) { }

    async ngOnInit() {

    }

    async onSubmit() {
        const settings = new UserSettings({
            musicFolderPath: this.settingsForm.value.music_folderControl as string,
            ffmpegPath: this.settingsForm.value.ffmpeg_locationControl as string,
            ffprobePath: this.settingsForm.value.ffprobe_locationControl as string
        })

        const event = new SaveUserSettingsEvent()
        event.requestPackage = {
            data: settings
        }

        await this.eventService.send(event)

        this.router.navigateByUrl('/lobby')
    }

}
