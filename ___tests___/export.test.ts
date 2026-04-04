import {createPointObservation_test, createPolygonObservation_test} from "./filterservice.test";
import {ExportStrategy} from "../src/services/ExportStrategy";
import {ObservationCSVExportStrategy} from "../src/services/ObservationCSVExportStrategy";
import {Observation} from "../src/model/observations";
import {EmailCSVExportStrategy} from "../src/services/EmailCSVExportStrategy";
import {Email} from "../src/model/emails";

describe("CSV Format Observations", () => {
    test("toFormat contains proper fields", async () => {
        const observation = createPointObservation_test("0", 0, 0)
        const strategy: ExportStrategy<Observation> = new ObservationCSVExportStrategy([observation])
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })

    test("Export polygon observation", async () => {
        const observation = createPolygonObservation_test()
        const strategy: ExportStrategy<Observation> = new ObservationCSVExportStrategy([observation])
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })

    test("Export two polygon observation", async () => {
        const observation1 = createPolygonObservation_test()
        const observations2 = createPolygonObservation_test()
        const observations = [observation1, observations2]
        const strategy: ExportStrategy<Observation> = new ObservationCSVExportStrategy(observations)
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("userId,observationId,verificationRating,timestamp,image,notes,estimatedArea,percentCoverage,WKT,gpsOrigin")
    })
})


describe("CSV Format Emails", () => {
    test("toFormat size one email", () => {
        const email = {userId: "test123", address: "email@example.com"}
        const strategy: ExportStrategy<Email> = new EmailCSVExportStrategy([email])
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("address")
    })

    test("toFormat size multiple emails", () => {
        const emails = [
            {userId: "test123", address: "email@example.com"},
            {userId: "test321", address: "email2@example.com"},
            {userId: "test5432", address: "email3@example.com"},
        ]
        const strategy: ExportStrategy<Email> = new EmailCSVExportStrategy(emails)
        console.log(strategy.toFormat())
        expect(strategy.toFormat()).toContain("address")
    })


})
