import * as ffmpeg from "fluent-ffmpeg"

export class FfmpegHandler {

    private static _instance: FfmpegHandler

    constructor() {
        // TODO aangeven dat ffmpeg gedownloadmoet worden en doorgegeven
        ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe")
        ffmpeg.setFfprobePath("C:\\ffmpeg\\bin\\ffprobe.exe")
    }

    public static getInstance(): FfmpegHandler {
        if (!FfmpegHandler._instance) FfmpegHandler._instance = new FfmpegHandler()
        return FfmpegHandler._instance
    }

    public read(url: string): Promise<any> {
        console.log(url)
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