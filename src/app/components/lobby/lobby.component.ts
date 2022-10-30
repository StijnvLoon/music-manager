import { Component, OnInit } from '@angular/core';
import { ReadDirsEvent } from 'electron/events/ReadDirsEvent';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

    constructor(
        private eventService: EventService
    ) { }

    async ngOnInit() {
        const event = new ReadDirsEvent()
        event.requestPackage = {
            data: 'C:\\Users\\Stijn van Loon\\Desktop\\temp'
        }

        await this.eventService.send(event)

        console.log(event.responsePackage)
    }

}
