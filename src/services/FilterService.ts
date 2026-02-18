import {Observation} from "../model/observations";

export class FilterService {
    private observationsExist: boolean = this.observations.length > 0

    constructor(private observations: Observation[]) {
    }

    //if end is not undefined or null, filter everything after from
    byDateRange(start: Date, end?: Date): Observation[] {
        if (!this.observationsExist) return [];
        if (!end) {
            return this.observations.filter((observation) => observation.timestamp >= start.getTime())
        }
        return this.observations.filter((observation) => observation.timestamp >= start.getTime() && observation.timestamp <= end.getTime())
    }

    byVerificationStatus(statusQuery: number): Observation[] {
        if (!statusQueryRange.includes(statusQuery)) {
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
}


const statusQueryRange = [0, 1, 2, 3] //unverified, no, yes, maybe
