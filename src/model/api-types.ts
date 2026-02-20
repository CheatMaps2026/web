import {Observation} from "./observations";

export type GetObservationsResponse = {
    success: boolean,
    data?: Observation[],
    count: number,
    message: string,
}