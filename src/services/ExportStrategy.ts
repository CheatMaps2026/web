export abstract class ExportStrategy<T> {
    protected abstract mime: string

    constructor(protected data: T[]) {
        this.data = data;
    }

    download(filename: string) {
        const blob = new Blob([this.toFormat()], {type: this.mime})
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a");
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
    }

    abstract toFormat(): string
}
