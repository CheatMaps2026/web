import {ExportStrategy} from "./ExportStrategy";
import {Observation} from "../model/observations";

export type GeoJSONFeature = {
    type: "Feature",
    geometry: {
        type: "Point" | "Polygon",
        coordinates: any;
    };
    properties: Record<string, unknown>
}

type GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: GeoJSONFeature[]
}

export class GeoJSONExportStrategy extends ExportStrategy<Observation> {
    protected mime: string = "application/geo+json"

    constructor(observations: Observation[]) {
        super(observations)
    }


    private createProperties(observation: Observation): Record<string, unknown> {
        console.log("createProperties", observation)
        return {
            userId: observation.userId,
            observationId: observation.observationId,
            verificationRating: observation.verificationRating,
            timestamp: observation.timestamp,
            image: observation.image,
            estimatedArea: observation.estimatedArea,
            gpsOrigin: observation.position.gpsOrigin,
        }

    }

    private toFeature(observation: Observation): GeoJSONFeature {
        const coordinates = observation.position.coordinates ?? []
        if (coordinates.length == 1) {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [coordinates[0].longitude, coordinates[0].latitude]
                },
                properties: this.createProperties(observation)
            }
        }

        //else it is a POLYGON
        const closed = [...coordinates, coordinates[0]]
        console.log("closed", closed)
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [closed.map(c => [c.longitude, c.latitude])]
            },
            properties: this.createProperties(observation)
        }
    }

    private observationsToGeoJSON(): GeoJSONFeatureCollection {
        return {
            type: "FeatureCollection",
            features: this.data.map(observation => this.toFeature(observation))
        }
    }

    toFormat(): string {
        return JSON.stringify(this.observationsToGeoJSON())
    }
}
