import * as ffmpeg from "fluent-ffmpeg"
import { UserSettings } from "../model/UserSettings"
import { FileHandler } from "./FileHandler"

export class FfmpegHandler {

    private static _instance: FfmpegHandler

    constructor() {
        FileHandler.readFileSync("UserSettings.json")
            .then((file) => {
                const settings = new UserSettings(JSON.parse(file.toString()))
                ffmpeg.setFfmpegPath(settings.ffmpegPath)
                ffmpeg.setFfprobePath(settings.ffprobePath)
            })
            .catch(() => { })
        
    }

    public static getInstance(): FfmpegHandler {
        if (!FfmpegHandler._instance) FfmpegHandler._instance = new FfmpegHandler()
        return FfmpegHandler._instance
    }

    public read(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                try {
                    ffmpeg(url)
                        .ffprobe((err, data) => {
                            console.log(err)
                            console.log(data)
                        })
                } catch (err) {
                    console.log(err)
                }

                resolve("" as any)
            } catch (err) {
                reject(err)
            }
        })
    }


}