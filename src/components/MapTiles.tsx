import {Observation} from "../model/observations";
import {GoogleMap, InfoWindow, Marker, MarkerF, PolygonF, useLoadScript} from "@react-google-maps/api";
import {useState} from "react";

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

    const [activeId, setActiveId] = useState<string | null>(null)

    return (
        <div className='map-container'>
            {isLoaded ? (
                <GoogleMap
                    onClick={()=>setActiveId(null)}
                    onZoomChanged={() => setActiveId(null)} // optional
                    center={center}
                    zoom={13}
                    mapContainerStyle={{
                        // width: '100%',
                        // height: '100%',
                        height: '100%',
                        width: '100%',
                    }}
                    options={{
                        clickableIcons: false,
                        styles: [
                            { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
                            { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
                            { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
                        ],
                    }}
                >
                    {observations?.map((observation) => {
                        const origin = observation.position.gpsOrigin;
                        const path =
                            observation.position.coordinates?.map(({latitude, longitude}) => ({
                                lat: latitude,
                                lng: longitude,
                            })) ?? [];

                        const isOpen = activeId === observation.observationId

                        return (
                            <div key={observation.timestamp ?? `${origin.latitude},${origin.longitude}`}>
                                <Marker position={{lat: origin.latitude, lng: origin.longitude}}
                                        onClick={() => setActiveId(observation.observationId)}>
                                    {isOpen && (
                                        <InfoWindow onCloseClick={() => setActiveId(null)}>
                                            <div className={"info-window-container"}>
                                                <div className={"info-window-title-container"}>
                                                    <h3>{observation.position.coordinates!.length > 1 ? `Polygon Observation` : `Point Observation`}</h3>
                                                    <p>
                                                        {observation.observationId}
                                                    </p>
                                                </div>

                                                <div className={"info-window-info-container"}>
                                                    <p>notes: {observation.notes}</p>
                                                    <p>estimated area: {observation.estimatedArea} square meters</p>
                                                    <p>percent coverage: {observation.percentCoverage}%</p>

                                                </div>
                                            </div>
                                        </InfoWindow>
                                    )}
                                </Marker>

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