import { Component, Input, OnInit } from '@angular/core';
import { Directory } from 'electron/model/Directory';
import { listContainerAnim, listItemsAnim } from 'src/app/animations/DefaultAnims';
import { DirectoryService } from 'src/app/services/directory.service';

@Component({
  selector: 'app-dir-folder',
  templateUrl: './dir-folder.component.html',
  styleUrls: ['./dir-folder.component.scss'],
})
export class DirFolderComponent implements OnInit {

    @Input() directory!: Directory
    @Input() level: number = 1

    opened: boolean = false
    folders: Directory[] = []

    constructor(
        private directoryService: DirectoryService
    ) { }

    ngOnInit(): void {

    }
    
    toggleFolder() {
        this.opened = !this.opened
        if(this.opened) this.loadContent() 
    }

    async loadContent() {
        const dirs: Directory[] = await this.directoryService.getDirs(this.directory.fullDir)
        this.folders = dirs.filter((dir) => dir.type == 'folder')
    }

}
