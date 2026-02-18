export type OriginMarker = {
    latitude: number,
    longitude: number,
    heading: number,
    accuracy: number
}

export type Observation = {
    userId: string,
    observationId: string,
    position: {
        coordinates?: [{
            latitude: number,
            longitude: number
        }],
        gpsOrigin: OriginMarker
    },
    notes: string,
    percentCoverage: number,
    image: string,
    timestamp: number,
    verificationRating: number,
    estimatedArea: number,
}