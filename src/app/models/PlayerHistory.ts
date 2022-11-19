export class PlayerHistory {

    private history: HistoryItem[]

    constructor() {
        this.history = []
    }

    add(dir: string): void {
        this.history.push({
            dir: dir,
            timeStamp: new Date()
        })
    }

    previous(): string | undefined {
        if(this.hasPrevious) {
            this.history.splice(this.history.length - 1, 1)
            return this.history[this.history.length - 1].dir
        }
        return undefined
    }

    on(index: number): string | undefined {
        return this.history[index] ? this.history[index].dir : undefined
    }
    
    clear(): void {
        this.history = []
    }

    get hasPrevious() {
        return this.history.length > 1
    }
}

interface HistoryItem {
    dir: string
    timeStamp: Date
}