export interface Directory {
    type: 'folder' | 'file'
    fullDir: string
    name: string
    fullName?: string
    extension?: string
}