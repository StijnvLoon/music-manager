import { Component, Input } from '@angular/core';
import { Directory } from 'electron/model/Directory';
import { DirectoryService } from 'src/app/services/directory.service';
import { ViewerService } from 'src/app/services/viewer.service';

@Component({
  selector: 'app-dir-folder',
  templateUrl: './dir-folder.component.html',
  styleUrls: ['./dir-folder.component.scss'],
})
export class DirFolderComponent {

    @Input() directory!: Directory
    @Input() level: number = 1

    opened: boolean = false
    folders: Directory[] = []

    constructor(
        private directoryService: DirectoryService,
        private viewerService: ViewerService
    ) { }
    
    toggleFolder() {
        this.opened = !this.opened
        this.viewerService.changeAlbum(this.directory)
        if(this.opened) this.loadContent() 
    }

    async loadContent() {
        const dirs: Directory[] = await this.directoryService.getDirs(this.directory.fullDir)
        this.folders = dirs.filter((dir) => dir.type == 'folder')
    }

}
