export interface IUserSettingsData {
    ffmpegPath: string
    ffprobePath: string
    musicFolderPath: string
}

export class UserSettings implements IUserSettingsData {

    ffmpegPath: string
    ffprobePath: string
    musicFolderPath: string

    constructor(data: IUserSettingsData) {
        this.ffmpegPath = data.ffmpegPath
        this.ffprobePath = data.ffprobePath
        this.musicFolderPath = data.musicFolderPath
    }
}