import {Observation} from "../model/observations";
import {GoogleMap, MarkerF, PolygonF, useLoadScript} from "@react-google-maps/api";

type props = {
    observations: Observation[] | null
}
export const MapTiles = ({observations}: props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCbAVEkhkMf11mpQXOUFzmyhFCCo_fmu3M'
    })

    let center = {
        lat: 38.5458,
        lng: -106.9253
    }

    if (observations && observations.length > 0) {
        const firstObservationPosition = observations[0].position.gpsOrigin
        center = {lat: firstObservationPosition.latitude, lng: firstObservationPosition.longitude}
    }

    return (
        <div className='map-container'>
            {isLoaded ? (<GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{
                    // width: '100%',
                    // height: '100%',
                    height: '100%',
                    width: '100%',
                }}
            >
                {observations?.map((observation) => {
                    const origin = observation.position.gpsOrigin;
                    const path =
                        observation.position.coordinates?.map(({latitude, longitude}) => ({
                            lat: latitude,
                            lng: longitude,
                        })) ?? [];

                    return (
                        <div key={observation.timestamp ?? `${origin.latitude},${origin.longitude}`}>
                            <MarkerF position={{lat: origin.latitude, lng: origin.longitude}}/>

                            {path.length > 1 && (
                                <PolygonF
                                    path={path}
                                    options={{
                                        fillColor: "rgba(255,0,0,0.2)",
                                        strokeColor: "#d600ab",
                                        strokeWeight: 2
                                    }}
                                />
                            )}
                        </div>
                    );
                })}

            </GoogleMap>) : <div><p>map not loaded</p></div>}
        </div>
    )
}