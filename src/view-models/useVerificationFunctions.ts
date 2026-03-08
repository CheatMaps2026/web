import {Observation} from "../model/observations";

type Props = {
    observations: Observation[],
    apiClient: any
}
export const useVerificationFunctions = ({observations, apiClient}: Props) => {


    const labelNotCheatgrass = async (index: number) => {
        const {userId, observationId} = observations[index];
        const body = {
            verificationRating: 1
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    const labelMaybeCheatgrass = async (index: number) => {
        const {userId, observationId} = observations[index];
        const body = {
            verificationRating: 3
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    const labelYesCheatgrass = async (index: number) => {
        const {userId, observationId} = observations[index];
        const body = {
            verificationRating: 2
        }

        const response = await apiClient.patch(`/observation/${userId}/${observationId}/verification`, body)
        console.log(response)
    }

    return {
        labelNotCheatgrass,
        labelMaybeCheatgrass,
        labelYesCheatgrass,
    }
}