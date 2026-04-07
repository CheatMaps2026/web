import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";

export const useMapViewModel = () => {
    const {observations} = useObservationStoreContext()
    return {
        observations,
    }
}
