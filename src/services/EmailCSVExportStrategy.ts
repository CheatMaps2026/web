import {ExportStrategy} from "./ExportStrategy";
import {Email} from "../model/emails";

export class EmailCSVExportStrategy extends ExportStrategy<Email> {
    protected mime = "text/csv"

    constructor(emails: Email[]) {
        super(emails);
    }

    toFormat() {
        const columns = ["address"] as const
        const header = columns.join(",")

        const rows = this.data.map(email => {
            return columns.map(col => String(email[col] ?? "")).join(",")
        })
        return [header, ...rows].join("\n")
    }
}
