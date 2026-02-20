import {useObservationStoreContext} from "../providers/ObservationsStoreProvider";
import {useObservationTableViewModel} from "./useObservationTableViewModel";

export const useMapViewModel = () => {
    const {observations} = useObservationStoreContext()
    const tableModel = useObservationTableViewModel({observations})
    return {
        observations,
        tableModel
    }
}