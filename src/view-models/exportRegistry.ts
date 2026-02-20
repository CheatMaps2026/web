import {ExportType} from "./useObservationTableViewModel";
import {Observation} from "../model/observations";
import {CSVExportStrategy} from "../services/CSVExportStrategy";
import {ExportStrategy} from "../services/ExportStrategy";
import {GeoJSONExportStrategy} from "../services/GeoJSONExportStrategy";


export const exportRegistry: Record<ExportType, (observations: Observation[]) => Promise<void>> = {
    CSV: async (observations: Observation[]) => {
        const strategy: ExportStrategy = new CSVExportStrategy(observations)
        strategy.download("selectedObservations.csv") //Would be a nice feature to just pass in a user-created filename
    },

    GEOJSON: async (observations: Observation[]) => {
        const strategy: ExportStrategy = new GeoJSONExportStrategy(observations)
        strategy.download("selectedObservations.geojson")
    }
}