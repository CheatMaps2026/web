import "../view-styles/MapViewStyle.css"
import {useMapViewModel} from "../view-models/useMapViewModel";
import {MapTiles} from "../components/MapTiles";

export const MapView = () => {
    const viewModel = useMapViewModel()

    return (
        <div className='map-view-root'>
            <MapTiles viewModel={viewModel}/>
        </div>
    )
}
