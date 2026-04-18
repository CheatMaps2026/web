import {Observation} from "../model/observations";


export const sanitize = (observation: Observation): Observation => {
    let notes = observation.notes?.replaceAll("'", '').replaceAll('"', '')
    notes = '"' + notes + '"'
    return {...observation, notes: notes}
}


// export const formatCoordinates = (coordinates: LatLng[]): string => {
//     if (!coordinates) {
//         return ""
//     }
//
//     return coordinates.map(c => `${c.latitude},${c.longitude}`).join(" | ")
// }

