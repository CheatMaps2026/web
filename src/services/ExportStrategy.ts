import {Observation} from "../model/observations";

export abstract class ExportStrategy {
    protected abstract mime: string

    constructor(protected observations: Observation[]) {
        this.observations = observations;
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