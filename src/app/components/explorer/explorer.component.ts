import { Component, OnInit } from '@angular/core';
import { Directory } from 'electron/model/Directory';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
    selector: 'app-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    folders: Directory[] = []

    constructor(
        private directoryService: DirectoryService
    ) { }

    async ngOnInit() {
        const dirs: Directory[] = await this.directoryService.getDirs()
        this.folders = dirs.filter((dir) => dir.type == 'folder')
    }

}
