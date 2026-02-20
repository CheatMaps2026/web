import {createPointObservation_test, createPolygonObservation_test} from "./filterservice.test";
import {ExportStrategy} from "../src/services/ExportStrategy";
import {CSVExportStrategy} from "../src/services/CSVExportStrategy";

describe("CSV format", () => {
    test("Export size one observation", async () => {
        const observation = createPointObservation_test("0", 0, 0)
        const strategy: ExportStrategy = new CSVExportStrategy([observation])
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })

    test("Export polygon observation", async () => {
        const observation = createPolygonObservation_test()
        const strategy: ExportStrategy = new CSVExportStrategy([observation])
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })

    test("Export two polygon observation", async () => {
        const observation1 = createPolygonObservation_test()
        const observations2 = createPolygonObservation_test()
        const observations = [observation1, observations2]
        const strategy: ExportStrategy = new CSVExportStrategy(observations)
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })

})
