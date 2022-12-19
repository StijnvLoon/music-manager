import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Directory } from 'electron/model/Directory';
import { DirectoryService } from 'src/app/services/directory.service';
import { PlayerService } from 'src/app/services/player.service';
import { ViewerService } from 'src/app/services/viewer.service';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

    @Input() explorerDrawer!: MatDrawer

    musicFiles: Directory[] = []
    selectedAlbum: string = ""

    constructor(
        private viewerService: ViewerService,
        private playerService: PlayerService,
        private directoryService: DirectoryService
    ) { }

    ngOnInit(): void {
        this.viewerService.onAlbumChange = (dir: Directory) => {
            this.selectedAlbum = dir.name
            this.loadMusicFiles(dir)
        }
    }

    private async loadMusicFiles(dir: Directory) {
        const dirs = await this.directoryService.getDirs(dir.fullDir)
        this.musicFiles = dirs.filter((dir) => dir.type == "file" && dir.extension == ".mp3")
    }

    play(file: Directory) {
        this.playerService.play(file.fullDir)
    }

}
