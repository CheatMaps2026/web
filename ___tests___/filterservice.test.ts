import {FilterService} from "../src/services/FilterService";
import {Observation} from "../src/model/observations";

test("Instantiation with list of observations", () => {
    const observations = identicalPointObservationFactory()
    const filter = new FilterService(observations);
    expect(filter).toBeDefined();
    expect(filter).toHaveProperty("observations");
})

describe("Filter by timestamp", () => {
    test("filter by date range excludes observations out of range", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        oldObservation = {...oldObservation, timestamp: 1}
        let observations = identicalPointObservationFactory()
        observations = [...observations, oldObservation]
        const filter = new FilterService(observations);
        const from = new Date(1) //Jan 1, 1970
        const to = new Date(2024, 11, 31) //December 31st, 2024... Just before the cutoff of all other observations (Jan 1, 2025)
        expect(filter.byDateRange(from, to).length).toBe(1)
    })

    test("filter by date range without end clause filter observations >= start clause", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        oldObservation = {...oldObservation, timestamp: 1}
        let observations = identicalPointObservationFactory()
        observations = [...observations, oldObservation]
        const filter = new FilterService(observations);
        const from = new Date(1) //Jan 1, 1970
        expect(filter.byDateRange(from).length).toBe(11)
    })
})


describe("Filter by verificationStatus", () => {
    test("filter by unverified  on 1 unverified observation returns length 1", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        const filter = new FilterService([oldObservation]);
        const desiredVerificationStatus = 0 // 0 means unverified
        expect(filter.byVerificationStatus(desiredVerificationStatus).length).toBe(1)
    })

    test("filter by verified on 1 unverified observation returns length 0", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        const filter = new FilterService([oldObservation]);
        const desiredVerificationStatus = 2 // 2 means verified
        expect(filter.byVerificationStatus(desiredVerificationStatus).length).toBe(0)
    })

    test("filter by no on 1 unverified observation returns length 0", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        const filter = new FilterService([oldObservation]);
        const desiredVerificationStatus = 1 // 2 means verified
        expect(filter.byVerificationStatus(desiredVerificationStatus).length).toBe(0)
    })

    test("filter by non acceptable range throws error", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        const filter = new FilterService([oldObservation]);
        const desiredVerificationStatus = 10 // 10 is not an acceptable status query
        expect(() => filter.byVerificationStatus(desiredVerificationStatus)).toThrow("Unexpected status query value")
    })
})

describe("Filter by estimatedArea", () => {
    test("filter by estimated area", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        oldObservation = {...oldObservation, estimatedArea: 10}
        let observations = identicalPointObservationFactory()
        observations = [...observations, oldObservation]
        const filter = new FilterService(observations);
        const areaQuery = 10 // 10 meters
        expect(filter.byEstimatedArea(areaQuery).length).toBe(11)//TODO change filter behavior. Perhaps filter by range of areas? or bin areas
    })
})

describe("Filter by percentCoverage", () => {
    test("filter by percentCoverage returns all observations that meet query demands", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        let observations = identicalPointObservationFactory()
        observations = [...observations, oldObservation]
        const filter = new FilterService(observations);
        const percentQuery = 25 // 10 meters
        expect(filter.byPercentCoverage(percentQuery).length).toBe(11)
    })

    test("filter by percentCoverage returns all observations that meet query demands", () => {
        let oldObservation = createPointObservation_test("0", 100, 100)
        oldObservation = {...oldObservation, percentCoverage: 10}
        let observations = identicalPointObservationFactory()
        observations = [...observations, oldObservation]
        const filter = new FilterService(observations);
        const percentQuery = 25 // 10 meters
        expect(filter.byPercentCoverage(percentQuery).length).toBe(10)
    })
})

export const createPolygonObservation_test = (): Observation => {
    // simple square (NOT explicitly closed)
    const coords = [
        { latitude: 40.0150, longitude: -105.2700 },
        { latitude: 40.0150, longitude: -105.2690 },
        { latitude: 40.0160, longitude: -105.2690 },
        { latitude: 40.0160, longitude: -105.2700 },
    ];

    const origin = coords[0];

    return {
        userId: "test-user",
        observationId: "poly-test-1",
        position: {
            coordinates: coords,
            gpsOrigin: {
                accuracy: 10,
                latitude: origin.latitude,
                longitude: origin.longitude,
                heading: 0,
            },
        },
        notes: "Mock polygon observation",
        percentCoverage: 25,
        image: "base64-placeholder",
        timestamp: new Date(2025, 0, 1).getTime(), // Jan 1 2025
        verificationRating: 0,
        estimatedArea: 0,
    };
};

export const createPointObservation_test = (
    id: string,
    lat: number,
    lon: number
): Observation => ({
    userId: "test-user",
    observationId: id,
    position: {
        coordinates: [{
            latitude: lat,
            longitude: lon
        }],
        gpsOrigin: {
            accuracy: 10,
            latitude: lat,
            longitude: lon,
            heading: 0,
        }
    },
    notes: "Mock point observation",
    percentCoverage: 25,
    image: "base64-placeholder",
    timestamp: new Date(2025, 0, 1).getTime(), //Jan 1 2025
    verificationRating: 0,
    estimatedArea: 0
});

const identicalPointObservationFactory = (): Observation[] => {
    const observations: Observation[] = []
    for (let i = 0; i < 10; i++) {
        observations.push(createPointObservation_test(i.toString(), 10, 10))
    }
    return observations;
}