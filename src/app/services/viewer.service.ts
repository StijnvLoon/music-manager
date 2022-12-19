import { Injectable } from '@angular/core';
import { Directory } from 'electron/model/Directory';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViewerService {

    private albumChangeObs: Subject<Directory> = new Subject()

    constructor() { }

    changeAlbum(dir: Directory) {
        this.albumChangeObs.next(dir)
    }

    set onAlbumChange(cb: (dir: Directory) => void) {
        this.albumChangeObs.subscribe(cb)
    }
}
