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

    ngOnInit(): void {
        this.eventService.send(new ReadDirsEvent({ data: 'C:\\Users\\Stijn van Loon\\Desktop\\temp' }))
            .then((dirs) => {
                console.log(dirs)
            })
    }

}
