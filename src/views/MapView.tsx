import "../view-styles/MapViewStyle.css"
import {useMapViewModel} from "../view-models/useMapViewModel";
import {MapTiles} from "../components/MapTiles";
import {ObservationTable} from "../components/ObservationTable";
import {useApiClient} from "../providers/ApiClientProvider";

export const MapView = () => {
    const {observations, tableModel} = useMapViewModel()
    const apiClientService = useApiClient()

    return (
        <div className='map-view-root'>
            <MapTiles observations={observations} apiClient={apiClientService}/>
            <ObservationTable viewModel={tableModel}/>
        </div>
    )
}
