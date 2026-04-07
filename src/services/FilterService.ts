import {Observation} from "../model/observations";

export type ObservationType = "POLYGON" | "POINT"

export type ObservationFilters = {
    start?: Date;
    end?: Date;
    verificationRating?: number;
    estimatedArea?: number;
    percentCoverage?: number;
    type?: ObservationType;
}

export class FilterService {
    constructor(private observations: Observation[]) {
    }

    private statusQueryRange = [0, 1, 2, 3]

    //if end is not undefined or null, filter everything after from
    byDateRange(start: Date, end?: Date): Observation[] {
        if (!end) {
            return this.observations.filter((observation) => observation.timestamp >= start.getTime())
        }
        return this.observations.filter((observation) => observation.timestamp >= start.getTime() && observation.timestamp <= end.getTime())
    }

    byVerificationStatus(statusQuery: number): Observation[] {
        if (!this.statusQueryRange.includes(statusQuery)) {
            throw new Error("Unexpected status query value")
        }
        return this.observations.filter((observation) => observation.verificationRating == statusQuery)
    }

    byEstimatedArea(areaQuery: number) {
        return this.observations.filter((observation) => observation.estimatedArea <= areaQuery)
    }

    byPercentCoverage(percentQuery: number) {
        return this.observations.filter((observation) => observation.percentCoverage == percentQuery)
    }

    byObservationType(typeQuery: ObservationType) {
        if (typeQuery === "POLYGON") {
            return this.observations.filter((observation) => observation.position.coordinates.length > 1)
        }
        return this.observations.filter((observation) => observation.position.coordinates.length === 1)
    }

    apply(filters: ObservationFilters) {

        if (filters.start || filters.end) {
            this.observations = this.byDateRange(filters.start!, filters.end)
        }

        if (filters.verificationRating !== undefined) {
            this.observations = this.byVerificationStatus(filters.verificationRating)
        }

        if (filters.estimatedArea !== undefined) {
            this.observations = this.byEstimatedArea(filters.estimatedArea)
        }

        if (filters.percentCoverage !== undefined) {
            this.observations = this.byPercentCoverage(filters.percentCoverage)
        }

        if (filters.type !== undefined) {
            this.observations = this.byObservationType(filters.type)
        }

        return this.observations
    }
}


