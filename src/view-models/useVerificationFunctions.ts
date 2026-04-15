import {Observation} from "../model/observations";

type Props = {
    apiClient: any
}

export enum Verification { UNVERIFIED = 0, NEGATIVE = 1, POSITIVE = 2, MAYBE = 3 }

export const VerificationMap: Record<Verification, string> = {
    0: "Unverified",
    1: "Negative",
    2: "Positive",
    3: "Maybe"
}


export const useVerificationFunctions = ({apiClient}: Props) => {

    const labelNotCheatgrass = async (observation: Observation) => {
        const {userId, observationId} = observation

        console.log("Deleting Observation")
        const response = await apiClient.delete(`/observation/${userId}/${observationId}`)
        console.log(response)
    }

    const labelMaybeCheatgrass = async (observation: Observation) => {
        const {userId, observationId} = observation
        observation.verificationRating = 3//Set object value here: causes color change on frontend
        const body = {verificationRating: 3}

        console.log("Labelling as maybe")

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    const labelYesCheatgrass = async (observation: Observation) => {
        const {userId, observationId} = observation
        observation.verificationRating = 2//Set object value here: causes color change on frontend
        const body = {verificationRating: 2}

        console.log("Labelling as yes")
        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }


    return {
        labelNotCheatgrass,
        labelMaybeCheatgrass,
        labelYesCheatgrass,
    }
}
