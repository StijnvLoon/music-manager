import * as fs from "fs";

export class FileHandler {

    retrieveDirs(url: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(url, (err, files) => {
                if(err) {
                    reject(err)
                } else {
                    // convert files to full paths
                    resolve(files.map((file) => {
                        return url + '\\' + file
                    }))
                }
            })
        })
    }

    readFile(dir: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(dir, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}