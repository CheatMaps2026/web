import {ExportStrategy} from "./ExportStrategy";
import {LatLng, Observation} from "../model/observations";

export class CSVExportStrategy extends ExportStrategy {
    protected mime = "text/csv"

    constructor(observations: Observation[]) {
        super(observations)
    }


    private toWktPoint = (coordinate: LatLng) => {
        return `POINT (${coordinate.longitude} ${coordinate.latitude})`
    }

    private toWktPolygon = (coordinates: LatLng[]) => {
        if (coordinates.length < 3) {
            throw new Error("Polygon must be have at least 3 coordinates")
        }

        const closed = [...coordinates, coordinates[0]]

        const pairs = closed.map(coord => `${coord.longitude} ${coord.latitude}`).join(",")

        return `POLYGON ((${pairs}))`
    }

    private observationToWkt = (coordinates: LatLng[]) => {
        if (!coordinates || coordinates.length === 0) return ""
        if (coordinates.length === 1) {
            return this.toWktPoint(coordinates[0])
        }

        return this.toWktPolygon(coordinates)
    }

    private csvEscape = (value: unknown): string => {
        if (value === null || value === undefined) return "";

        const s = String(value);
        const escaped = s.replace(/"/g, '""');

        if (/[",\n]/.test(escaped)) return `"${escaped}"`;
        return escaped;
    };


    private toCsvRow = (observation: Observation) => {
        return {
            userId: observation.userId,
            observationId: observation.observationId,
            verificationRating: observation.verificationRating,
            timestamp: observation.timestamp,
            image: observation.image,
            notes: observation.notes,
            estimatedArea: observation.estimatedArea,
            percentCoverage: observation.percentCoverage,
            WKT: this.observationToWkt(observation.position.coordinates ?? []),
            gpsOrigin: JSON.stringify(observation.position.gpsOrigin),
        }
    }

    private toWktCsv = () => {
        const columns = [
            "userId",
            "observationId",
            "verificationRating",
            "timestamp",
            "image",
            "notes",
            "estimatedArea",
            "percentCoverage",
            "WKT",
            "gpsOrigin",
        ] as const;

        const header = columns.join(",")
        const rows = this.observations.map(observation => {
            const row = this.toCsvRow(observation)
            return columns.map(col => this.csvEscape(row[col])).join(",")
        })

        return [header, ...rows].join("\n")
    }

    toFormat() {
        return this.toWktCsv()
    }


}