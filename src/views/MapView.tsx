import "../view-styles/MapViewStyle.css"
import {useMapViewModel} from "../view-models/useMapViewModel";
import {MapTiles} from "../components/MapTiles";
import {useApiClient} from "../providers/ApiClientProvider";

export const MapView = () => {
    const {observations} = useMapViewModel()
    const apiClientService = useApiClient()

    return (
        <div className='map-view-root'>
            <MapTiles observations={observations} apiClient={apiClientService}/>
        </div>
    )
}
