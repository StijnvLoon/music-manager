import * as fs from "fs";

export class FileHandler {

    static retrieveDirs(url: string): Promise<string[]> {
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

    static readFile(dir: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.readFile(dir, (err, data) => {
                if(err || data == undefined) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static readFileSync(dir: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const res = fs.readFileSync(dir)
            if(res) {
                resolve(res)
            } else {
                reject()
            }
        })
    }

    static writeFile(path: string, content: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(undefined)
                }
            })
        })
    }
}