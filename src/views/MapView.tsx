import "../view-styles/MapViewStyle.css"
import {useMapViewModel} from "../view-models/useMapViewModel";
import {MapTiles} from "../components/MapTiles";
import {ObservationTable} from "../components/ObservationTable";

export const MapView = () => {
    const {observations, tableModel} = useMapViewModel()

    return (
        <div className='map-view'>
            <MapTiles observations={observations}/>
            <ObservationTable viewModel={tableModel}/>
        </div>
    )
}
