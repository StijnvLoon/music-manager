import * as fs from "fs";

export class FileHandler {

    retrieveDirs(url: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(url, (err, dirs) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(dirs)
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